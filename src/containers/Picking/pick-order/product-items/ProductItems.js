import React, { useState } from "react"
import styled from '@emotion/styled';
import { Button, Input } from "components";
import InputCounter from "components/Input/InputCounter";
import { usePickOrder } from "../hooks/PickOrderContext";


const ProductItems = ({ id, data }) => {
  const { handlePickOrder } = usePickOrder()
  const handleAddProduct = (data) => {
    handlePickOrder(id, data)
  }

  return (
    <>
      {data && data.models && data.models.map((product, key) => (
        <ProductItem
          onAddProduct={handleAddProduct}
          data={product} key={key} />
      ))}
    </>
  )
}

const ProductItem = ({ data, onAddProduct }) => {
  const utdQty = Number(data.utdQty).toFixed()
  const [qty, setQty] = useState(1)
  const [altSku, setAltSku] = useState("")

  const handleNoStock = () => {
    process(0)
  }

  const handleAddProduct = () => {
    process(qty)
  }

  const handleChangeQty = (val) => {
    // if (val > data.quantity || val <= 0) {
    //   return
    // }
    setQty(val)
  }

  const process = (pick_qty) => {
    const orderItem = {
      alt_sku: altSku,
      pick_qty,
      quantity: 0,
      final_price: data.price,
      promo_price: data.promo_price || "",
      pricing_note: data.pricing_note || "Test",
      product: data.id
    }
    onAddProduct(orderItem)
  }
  return (
    <>
      <ProductContainerMobile>
        <ProductHeader>
          <img src={data.imageUrl} height="72" />
          <hgroup>
            <ProductName>{data.itemCode}</ProductName>
            <ProductSku>{data.barCode}</ProductSku>
          </hgroup>
          <Price>${Number(data.price).toFixed(2)}</Price>
        </ProductHeader>
        <ProductMetaMobile>
          <MetaLabel>Ordered</MetaLabel>
          <QtyBox>Qty: {utdQty}</QtyBox>

          <MetaLabel>Picked</MetaLabel>
          <InputCounter value={qty} onChange={handleChangeQty} />

          <MetaLabel>Alt SKU</MetaLabel>
          <MetaValue>
            <Input
              required="required"
              placeholder="Enter Alt SKU"
              name="sku"
              title="Enter Alt SKU"
              value={altSku}
              onChange={(e) => setAltSku(e.target.value)}
            />
          </MetaValue>

        </ProductMetaMobile>

        <MobileFooter>
          <Button onClick={handleNoStock} style={{ width: "105px" }} variant="primary-outline">No Stock</Button>
          <Button onClick={handleAddProduct} style={{ width: "105px" }} variant="secondary" disabled={data.added}>{!data.added ? "Add" : (
            <>
              <img src="/static/images/icons/order-to-pack.svg" /> Added
            </>
          )}
          </Button>
        </MobileFooter>

      </ProductContainerMobile>
      <ProductContainer>
        <ProductMeta>
          <ProductImage>
            <img src={data.imageUrl} />
          </ProductImage>
          <ProductNameContainer>
            <ProductName>{data.itemCode}</ProductName>
            <ProductSku>{data.barCode}</ProductSku>
          </ProductNameContainer>
          <Price>${Number(data.price).toFixed(2)}</Price>
          <QtyBox>Qty: {utdQty}</QtyBox>
          <InputCounter value={qty} onChange={setQty} />
          <InputSkuContainer>
            <Input
              required="required"
              placeholder="Enter Alt SKU"
              name="sku"
              title="Enter Alt SKU"
              value={altSku}
              onChange={(e) => setAltSku(e.target.value)}
            />
          </InputSkuContainer>
          <Button variant="primary-outline">No Stock</Button>
          <Button onClick={() => handleAddProduct(data)} variant="secondary" disabled={data.added}>{!data.added ? "Add" : (
            <>
              <img src="/static/images/icons/order-to-pack.svg" /> Added
            </>
          )}
          </Button>
        </ProductMeta>
      </ProductContainer>
    </>
  )
}

const ProductContainer = styled.div`
  display: none;
  gap: 1rem;
  margin: 1rem 1.75rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #E0E6ED;
  flex-grow: 1;

  @media screen and (min-width: 800px) {
    display: flex;
  }
`

const ProductContainerMobile = styled.div`
  margin: 1rem 1.75rem;
  @media screen and (min-width: 800px) {
    display: none;
  }
`

const ProductHeader = styled.div`
display: flex;
  gap: 2rem;
`

const ProductMetaMobile = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 1rem;
`

const MetaLabel = styled.div`
margin-bottom: 1.5rem;
`

const MetaValue = styled.div`

`

const MobileFooter = styled.div`
justify-content: center;
display:flex;
align-items: center;
gap: 1rem;
padding-bottom: 1rem;
border-bottom: 1px solid #D3DCE6;

> button {
width: 100%!important;
}
`

const ProductImage = styled.div`
  width: 72px;
  grid-row: span 2;
  grid-column: span 2;

  @media screen and (min-width: 1000px) {
    grid-row: span 3;
  }
`
const ProductMeta = styled.div`
  gap: 1rem;
  display: grid;
  flex-grow: 1;
  grid-template-columns: 36px 36px 1.5fr 1fr;


  @media screen and (min-width: 1000px) {
  grid-template-columns: 36px 36px 1.5fr 1fr 1fr;
  }

`

const ProductNameContainer = styled.div`
  grid-row: span 1;

  @media screen and (min-width: 1000px) {
    grid-row: span 2;
  }
`
const ProductName = styled.div``
const ProductSku = styled.div`
  font-size: 12px;
  color: #8492A5;
`

const InputSkuContainer = styled.div`
  font-size: 12px;
  padding-bottom: 0;
  > div {
      margin-bottom: 0;
      height: 100%;
  }
  input {
    min-height: 32px;
    width: 100%;
    min-width: auto;
  }

  grid-column: span 2;

  @media screen and (min-width: 1000px) {
    grid-column: span 1;
  }

  @media screen and (min-width: 1200px) {
    input {
      width: 100%;
    }
  }
`
const QtyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  background: #FFFFFF;
  color: black;
  font-size: 12px;
  border: 1px solid #D3DCE6;
  text-align: center;
  box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
  border-radius: 3px;
`
const Price = styled.div`
    text-align: right;
    font-size: 18px;
    grid-column: span 1;

  @media screen and (min-width: 1000px) {
    grid-column: span 2;
  }
`

export default ProductItems
