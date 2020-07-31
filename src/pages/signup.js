import React from "react";
import { useSignUpPageStyles } from "../styles";
import SEO from '../components/shared/Seo';
import { Card, TextField, Button, Typography } from '@material-ui/core';
import { LoginWithFacebook } from "./login";
import { Link } from 'react-router-dom';

function SignUpPage() {
  const classes = useSignUpPageStyles();

  return (
    <>
      <SEO title="Sign up" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <div className={classes.cardHeader} />
            <Typography className={classes.cardHeaderSubHeader}>
              Sign up to see photos and videos from your friends.
            </Typography>
            <LoginWithFacebook color="primary" iconColor="white" variant="contained" />
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <form>
              <TextField
                fullWidth
                varient="filled"
                label="Email"
                type='email'
                margin="dense"
                className={classes.textField}
              />
              <TextField
                fullWidth
                varient="filled"
                label="Full Name"
                margin="dense"
                className={classes.textField}
              />
              <TextField
                fullWidth
                varient="filled"
                label="Username"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                fullWidth
                varient="filled"
                label="Password"
                type="password"
                margin="dense"
                className={classes.textField}
                autocomplete="new-password"
              />
              <Button
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Sign Up
              </Button>
            </form>
         
          </Card>
          <Card className={classes.loginCard}>
            <Typography align="right" variant="body2">
             Have an account'
            </Typography>
            <Link to="/accounts/login">
              <Button color="primary" className={classes.loginButton}>
                Log in
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  );
}

export default SignUpPage;
