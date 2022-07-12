import React from "react"
import Layout from "layout";
import { PickOrderProvider } from "./hooks/PickOrderContext";
import PickOrder from "./PickOrder"
import { PageBody } from "components";
import { PageLoadingProvider } from "components/PageLoading/PageLoading";

export default (props) => {
  return (
    <Layout>
      <PageBody>
        <PageLoadingProvider>
          <PickOrderProvider id={props.id}>
            <PickOrder {...props} />
          </PickOrderProvider>
        </PageLoadingProvider>
      </PageBody>
    </Layout >
  )
}
