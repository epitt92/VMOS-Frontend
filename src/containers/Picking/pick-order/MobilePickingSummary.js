import React from "react"
import styled from '@emotion/styled';
import { Breadcrumbs, HeadingDetailTitle, PageBody } from "components";
import PickingDetails from "./PickingDetails";
import Layout from "layout";
import { PickOrderProvider } from "./hooks/PickOrderContext";

const PickOrder = ({ id }) => {
  return (
    <Layout>
      <PageBody>
        <PickOrderProvider id={id}>
          <div>
            <Breadcrumbs>Picking / Pick Order</Breadcrumbs>
            <HeadingDetailTitle>Pick Order</HeadingDetailTitle>
            <Box>
              <PickingDetails id={id} />
            </Box>
          </div>
        </PickOrderProvider>
      </PageBody>
    </Layout >
  )
}


const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 200px;
  align-items: stretch;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    align-items: flex-start;
  }

`;


export default PickOrder
