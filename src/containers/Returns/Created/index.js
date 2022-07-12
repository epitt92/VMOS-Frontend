import React from 'react';
import Layout from 'layout';
import { PageBody } from 'components';
import { PageLoadingProvider } from 'components/PageLoading/PageLoading';
import Created from './Created';
import { ReturnCreatedProvider } from './hooks/ReturnCreatedContext';

const Index = ({ id }) => {
  return (
    <Layout>
      <PageBody>
        <PageLoadingProvider>
          <ReturnCreatedProvider>
            <Created id={id} />
          </ReturnCreatedProvider>
        </PageLoadingProvider>
      </PageBody>
    </Layout>
  );
};

export default Index;
