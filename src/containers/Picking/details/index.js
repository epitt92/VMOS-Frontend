import React from "react"
import { Breadcrumbs, HeadingDetailTitle, PageBody } from "components";
import PickOrderDetails from "./PickOrderDetails"
import Layout from "layout";

const PickOrder = ({ id }) => {
  return (
    <Layout>
      <PageBody>
        <Breadcrumbs>Picking / Pick Order</Breadcrumbs>
        <HeadingDetailTitle>Pick Order</HeadingDetailTitle>
        <PickOrderDetails id={id} />
      </PageBody>
    </Layout>
  )
}



export default PickOrder
