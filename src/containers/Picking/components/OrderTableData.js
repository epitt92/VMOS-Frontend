import React from "react"
import styled from '@emotion/styled';
import { ItemStatus } from "components/ui";

const OrderTableData = ({ data, onDelete, id }) => {
  return (
    <GridTable>
      <GridRowHead>
        <GridHead style={{ textAlign: "left" }}>Product</GridHead>
        <GridHead className="rrp">RRP</GridHead>
        <GridHead className="alt-sku">Alt SKU</GridHead>
        <GridHead className="qty">Qty</GridHead>
        <GridHead className="picked">Picked</GridHead>
      </GridRowHead>

      {data && data.map((v, key) => (
        <OrderTableDataRow id={id} data={v} key={key} onDelete={onDelete} />
      ))
      }
    </GridTable >
  )
}

const OrderTableDataRow = ({ data, onDelete, id }) => {
  const status = () => {
    if (data.quantity === 0) {
      return "added"
    }

    return ""
  }

  const handleDelete = () => {
    if (!onDelete) return
    onDelete(id, {
      pick_qty: 0,
      quantity: data.quantity,
      final_price: data.final_price,
      promo_price: data.promo_price || "",
      pricing_note: data.pricing_note || "Test",
      product_code: data.product_code
    })
  }
  return (
    <GridRowData>
      <GridData>
        <div style={{ display: "flex", gap: "1rem" }}>
          <ProductName>{data.product_code}</ProductName>
          {status() && <ItemStatus status={status()}>{status()}</ItemStatus>}
        </div>
        <SubData>{data.product_id}</SubData>
        {data.alt_skus[0] && <SubDataSku>Alt SKU: {data.alt_skus[0]}</SubDataSku>}
      </GridData>
      <GridData className="rrp">
        <ProductPrice>
          ${Number(data.product_rrp).toFixed(2)}
        </ProductPrice>
      </GridData>
      <GridData className="alt-sku">{data.alt_skus[0]}&nbsp;
        <img src="/static/images/icons/arrow-down-small-white.svg" />
      </GridData>
      <GridData className="qty">{data.quantity}</GridData>
      <GridData className="picked">{data.pick_qty}</GridData>
      {onDelete && (
        <GridData>
          <img style={{ cursor: "pointer" }} src="/static/images/icons/close.svg" onClick={handleDelete} />
        </GridData>
      )}
    </GridRowData>
  )
}

const GridTable = styled.div`
`

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(2, 1fr) .5fr;
  padding: .5rem 1.75rem;
  justify-content: space-around;
  align-items: center;
  text-align: center;

  > div.alt-sku, > div.rrp {
    display: none;
  }

  @media screen and (min-width: 600px) {
    grid-template-columns: 1.5fr repeat(4, 1fr) .5fr;

     > div.alt-sku, > div.rrp {
      display: block;
     }
  }
`

const GridRowHead = styled(GridRow)`
  background-color: #EBEFF5;

`

const GridRowData = styled(GridRow)`
margin: .5rem 1.75rem;
padding: 0;
padding-bottom: 1rem;
padding-top: .5rem;
border-bottom: 1px solid #E0E6ED;
`

const GridHead = styled.div`
  color: #3B4857;
`

const GridData = styled.div`
font-size: 12px;
text-align: center;
`


const ProductName = styled.div`
  font-size: 12px;
  text-align: left;

  @media screen and (min-width: 600px) {
    font-size: 14px;
  }
`
const ProductPrice = styled.div`
  text-align: center;
`;

const SubData = styled.span`
  color: #8492A5;
  font-size: 12px;
  text-align: left;
  display: block;
`

const SubDataSku = styled.span`
  color: black;
  font-size: 12px;
  text-align: left;
  display: block;
  margin-top: 1rem;

  @media screen and (min-width: 600px) {
    display: none;
  }
`

export default OrderTableData
