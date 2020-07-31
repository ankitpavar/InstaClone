import React from 'react';
import { useFeedPageStyles } from '../styles';
import Layout from '../components/shared/Layout';
import { defaultPost } from '../data'
function FeedPage() {
  const classes = useFeedPageStyles();

  return (
    <Layout>
      <div className={classes.container}>
        <div>
        
        </div>
      </div>
    </Layout>
  );
}

export default FeedPage;
