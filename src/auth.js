import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import React, { useState, useEffect } from 'react';
import defaultUserImage from './images/default-user-image.jpg';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from './graphql/mutations';

const provider = new firebase.auth.GoogleAuthProvider();

// Find these options in your Firebase console
firebase.initializeApp({
  apiKey: 'AIzaSyANV2Cb6S3rml5LmNyvOgJd1TwsQ-qOtq4',
  authDomain: 'instaclone-ea667.firebaseapp.com',
  databaseURL: 'https://instaclone-ea667.firebaseio.com',
  projectId: 'instaclone-ea667',
  storageBucket: 'instaclone-ea667.appspot.com',
  messagingSenderId: '861787059552',
  appId: '1:861787059552:web:1c786ee6df2e8b4a84da05',
  measurementId: 'G-KV0WRRLJ8K',
});

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({ status: 'loading' });
  const [createUser] = useMutation(CREATE_USER);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims['https://hasura.io/jwt/claims'];

        if (hasuraClaim) {
          setAuthState({ status: 'in', user, token });
        } else {
          // Check if refresh is required.
          const metadataRef = firebase
            .database()
            .ref(`metadata/${user.id}/refreshTime`);

          metadataRef.on('value', async (data) => {
            if (!data.exists) return;
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            setAuthState({ status: 'in', user, token });
          });
        }
      } else {
        setAuthState({ status: 'out' });
      }
    });
  }, []);

  const logInWithGoogle = async () => {
    const data = await firebase.auth().signInWithPopup(provider);
    if (data.additionalUserInfo.isNewUser) {
      const { uid, displayName, email, photoURL } = data.user;
      const username = `${displayName.replace(/\s+/g, '')}${uid.slice(-5)}`
      const variables = {
        userId: uid,
        name: displayName,
        username: username,
        email: email,
        bio: '',
        website: '',
        phoneNumber: '',
        profileImage: photoURL,
      };
      await createUser({ variables });
    }
  };

  async function logInWithEmailAndPassword(email, password) {
    const data = await firebase.auth().signInWithEmailAndPassword(email, password);
    return data;
  }
  
  async function signUpWithEmailAndPassword(formData) {
    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(formData.email, formData.password);
    if (data.additionalUserInfo.isNewUser) {
      const variables = {
        userId: data.user.uid,
        name: formData.name,
        username: formData.username,
        email: data.user.email,
        bio: '',
        website: '',
        phoneNumber: '',
        profileImage: defaultUserImage,
      };
      await createUser({ variables });
    }
  }

  const signOut = async () => {
    setAuthState({ status: 'loading' });
    await firebase.auth().signOut();
    setAuthState({ status: 'out' });
  };

  if (authState.status === 'loading') {
    return null;
  } else {
    return (
      <AuthContext.Provider
        value={{
          authState,
          logInWithGoogle,
          signOut,
          signUpWithEmailAndPassword,
          logInWithEmailAndPassword,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}
export default AuthProvider;
