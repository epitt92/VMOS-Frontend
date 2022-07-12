import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from 'components';
import InputCounter from 'components/Input/InputCounter';
import SkuSelect from 'containers/Sales/components/SkuSelect';
import { useReturnCreated } from './hooks/ReturnCreatedContext';

const ProductList = ({ id, data }) => {
  return <>{data && data.models && data.models.map((product, key) => <ProductItem data={product} key={key} />)}</>;
};

const ProductItem = ({ data }) => {
  const [qty, setQty] = useState(1);
  const [altSku, setAltSku] = useState('');
  const { addProduct } = useReturnCreated();

  const handleSkuChange = e => {
    setAltSku(e.value);
  };

  const handleChangeQty = val => {
    // if (val > data.quantity || val <= 0) {
    //   return
    // }
    setQty(val);
  };

  const handleAddProduct = () => {
    const product = {
      altSku,
      qty,
      defectiveQuantity: 0,
      itemCode: data.itemCode,
      itemId: data.id,
      imageFileName: data.imageFileName,
      price: data.price,
    };
    addProduct(product);
  };

  const debtor = () => {
    return window.localStorage.getItem('returnDebtor');
  };
  return (
    <>
      <ProductContainerMobile>
        <ProductHeader>
          <img src={data.imageUrl} height="72" />
          <hgroup>
            <ProductName>{data.itemCode}</ProductName>
            <ProductSku>{data.barCode}</ProductSku>
          </hgroup>
        </ProductHeader>
        <span>{data.description}</span>
        <ProductMetaMobile>
          <MetaLabel>Ordered</MetaLabel>
          <InputCounter value={qty} onChange={handleChangeQty} />
          <MetaLabel>Alt Sku</MetaLabel>
          <SkuSelect debtor={debtor()} price={data.price} onChange={handleSkuChange} />
        </ProductMetaMobile>

        <MobileFooter>
          <Button onClick={handleAddProduct} style={{ width: '105px' }} variant="secondary" disabled={data.added}>
            {!data.added ? (
              'Add'
            ) : (
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
          <InputCounter value={qty} onChange={setQty} />
          <InputSkuContainer>
            <span>{data.description}</span>
          </InputSkuContainer>
          <SkuSelect debtor={debtor()} price={data.price} onChange={handleSkuChange} />
          <Button onClick={() => handleAddProduct(data)} variant="secondary" disabled={data.added}>
            {!data.added ? (
              'Add'
            ) : (
              <>
                <img src="/static/images/icons/order-to-pack.svg" /> Added
              </>
            )}
          </Button>
        </ProductMeta>
      </ProductContainer>
    </>
  );
};

const ProductContainer = styled.div`
  display: none;
  gap: 1rem;
  margin: 1rem 1.75rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #e0e6ed;
  flex-grow: 1;

  @media screen and (min-width: 800px) {
    display: flex;
  }
`;

const ProductContainerMobile = styled.div`
  margin: 1rem 1.75rem;
  @media screen and (min-width: 800px) {
    display: none;
  }
`;

const ProductHeader = styled.div`
  display: flex;
  gap: 2rem;
`;

const ProductMetaMobile = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const MetaLabel = styled.div`
  margin-bottom: 1.5rem;
`;

const MetaValue = styled.div``;

const MobileFooter = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #d3dce6;

  > button {
    width: 100% !important;
  }
`;

const ProductImage = styled.div`
  width: 72px;
  grid-row: span 2;
  grid-column: span 2;

  @media screen and (min-width: 1000px) {
    grid-row: span 3;
  }
`;
const ProductMeta = styled.div`
  gap: 1rem;
  display: grid;
  flex-grow: 1;
  grid-template-columns: 36px 36px 1.5fr 1fr;

  @media screen and (min-width: 1000px) {
    grid-template-columns: 36px 36px 1.5fr 1fr 1fr;
  }
`;

const ProductNameContainer = styled.div`
  grid-column: span 2;
`;
const ProductName = styled.div``;
const ProductSku = styled.div`
  font-size: 12px;
  color: #8492a5;
`;

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
`;
const QtyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  background: #ffffff;
  color: black;
  font-size: 12px;
  border: 1px solid #d3dce6;
  text-align: center;
  box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
  border-radius: 3px;
`;
const Price = styled.div`
  text-align: right;
  font-size: 18px;
  grid-column: span 1;

  @media screen and (min-width: 1000px) {
    grid-column: span 2;
  }
`;

export default ProductList;
