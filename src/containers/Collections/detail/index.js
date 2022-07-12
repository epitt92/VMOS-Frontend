import React from "react"
import Layout from "layout";
import CollectionDetail from "./CollectionDetail";
import { PageLoadingProvider } from "components/PageLoading/PageLoading";
import { ItemsCreatorProvider } from "./hooks";

const CollectionDetailPage = ({ id, step }) => {
  return (
    <Layout>
      <PageLoadingProvider>
        <ItemsCreatorProvider>
          <CollectionDetail step={step} id={id} />
        </ItemsCreatorProvider>
      </PageLoadingProvider>
    </Layout >
  )
}

export default CollectionDetailPage
