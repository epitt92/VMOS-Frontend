import React from 'react';
import Layout from 'layout';
import NewSingel from './NewSingel/index.js';
import { PageLoadingProvider } from 'components/PageLoading/PageLoading.js';

const NewSingelPage = props => {
  return (
    <Layout>
      <PageLoadingProvider>
        <NewSingel {...props} />
      </PageLoadingProvider>
    </Layout>
  );
};

export default NewSingelPage;
