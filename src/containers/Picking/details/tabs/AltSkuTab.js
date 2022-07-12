import React from "react"
import styled from '@emotion/styled';
import { Line  } from "components/ui";
import { ApiOrders } from "api";
import { Loading } from "components";
import useSWR from "swr";

const AltSku = ({ id  }) => {
  const { data, error } = useSWR(id, ApiOrders.getAltSkus, {
    revalidateOnReconnect: false,
    revalidateOnFocus: false
  })

  if (!data && !error) {
    return (
      <div className="d-flex w-100 py-4 align-items-center justify-content-center">
        <Loading />
      </div>
    )
  }


  const skus = data.data.data.items || []

  return (
    <GridTable>
      <GridRowHead>
        <GridHead style={{ textAlign: "left" }}>Alt SKU</GridHead>
        <GridHead>Qty</GridHead>
      </GridRowHead>
      {skus && skus.map((v, key) => (
        <Sku data={v} key={key} />
      ))}
    </GridTable >
  )
}

const Sku = ({ data }) => {
  return (
    <>
      <GridRowData>
        <GridData>
          <SkuHeading>{data.altSku}</SkuHeading>
        </GridData>
        <GridData>
          <SkuHeading>{data.altSkuCount}</SkuHeading>
        </GridData>
      </GridRowData>
      {
        data.productCodes.map((sku, key) => (
          <GridRowSubData key={key}>
            <GridData>
              <SubData>{sku}</SubData>
            </GridData>
            <GridData>
              <SubData>1</SubData>
            </GridData>
          </GridRowSubData>
        ))
      }
      <GridLine />
    </>
  )
}

const GridTable = styled.div`
`

const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: .5rem 1.75rem;
  justify-content: space-around;
  align-items: center;
`

const GridRowHead = styled(GridRow)`
  background-color: #EBEFF5;
`

const GridHead = styled.div`
  color: #3B4857;
`

const GridRowData = styled(GridRow)`
margin: .5rem 1.75rem;
margin-bottom: 1rem;
padding: 0;
padding-top: .5rem;
`

const GridRowSubData = styled(GridRowData)`
border: none;
padding: 0;
`

const GridData = styled.div`
font-size: 12px;
`

const SkuHeading = styled.div`
font-size: 14px;
`

const SubData = styled.span`
color: #8492A5;
font-size: 12px;
`

const GridLine = styled(Line)`
margin-left: 1.75rem;
margin-right: 1.75rem;
`

export default AltSku
