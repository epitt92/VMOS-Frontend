import React from 'react';
import styled from '@emotion/styled';
import moment from 'moment';
import { Button, Select } from 'components';
import { useRouter } from 'next/router';
import { useReturnCreated } from './hooks/ReturnCreatedContext';
import SkuSelect from 'containers/Sales/components/SkuSelect';
import InputCounter from 'components/Input/InputCounter';
import { usePageLoading } from 'components/PageLoading/PageLoading';
import { ApiReturnOrders } from 'api';

const Catalogue = ({ id, items, detail }) => {
  const router = useRouter();
  const { products, editProduct, deleteProduct } = useReturnCreated();
  const { showPageLoading, closePageLoading } = usePageLoading();

  const handleSubmit = async () => {
    showPageLoading();
    const data = {
      returnId: id,
      items: products.map(p => ({
        altSku: p.altSku,
        defectiveQuantity: p.defectiveQuantity,
        itemCode: p.itemCode,
        itemId: p.itemId,
        quantity: p.quantity,
      })),
    };

    await ApiReturnOrders.createItems(data);
    router.push(`/returns/${id}`);
    closePageLoading();
  };

  const itemlists = [...items, ...products];

  const debtor = () => {
    return window.localStorage.getItem('returnDebtor');
  };

  return (
    <div className="col-md-6">
      <CatalogueSection>
        <b className="title">Return Details</b>
        <div className="header">
          <h5 className="d-flex align-items-center">
            {detail.title}
            <a className="ms-auto p-0 btn btn-outline-secondary border-0 d-inline-flex align-items-center text-primary">
              <img className="me-2 d-inline-block" src="/static/images/icons/download.svg" alt="Download" />
              Download Excel
            </a>
          </h5>
          <span className="d-flex align-items-center label">Customer: {detail.customerReturnRef}</span>
          <div className="start-date">Start Date: {moment(detail.createdAt).format('DD/MM/yyyy')}</div>
          <span className="d-block mb-3 ref">
            <b>#Ref: 8F0BFA</b>&nbsp;
            <b>#Customer Ref: srgFA3A04F98125</b>
          </span>
          <span className="d-block text-read">{detail.description}</span>
          <div className="d-flex align-items-end">
            <div className="w-75">
              <Select
                label={<span className="mt-4 mb-2 d-block">ToLocation</span>}
                options={[]}
                background={`#fff`}
                border={`#D3DCE6`}
                colorHover={`#fff`}
                colorSelected={`#fff`}
                color={`#212529`}
                backgroundSelected={`#828BAE`}
                placeholder={`Default: ‘WH-VM’`}
              />
            </div>
            {/* <button className='ms-3 btn btn-primary w-50'>Create Order</button> */}
          </div>

          <GridTable>
            <GridRowHead>
              <GridHead style={{ textAlign: 'left' }}>Product</GridHead>
              <GridHead className="alt-sku">Alt SKU</GridHead>
              <GridHead className="qty">Qty</GridHead>
              <GridHead className="defective">Defective Qty</GridHead>
            </GridRowHead>

            {itemlists &&
              itemlists.map((v, key) => (
                <GridRowData key={key}>
                  <GridData>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <ProductName>{v.product.itemCode}</ProductName>
                    </div>
                    <SubData>{v.product.itemId}</SubData>
                  </GridData>
                  <GridData className="alt-sku">
                    <SkuSelect
                      selected={v.altSku}
                      debtor={debtor()}
                      price={v.product.price}
                      onChange={e => editProduct(key, 'altSku', e.value)}
                    />
                  </GridData>

                  <InputCounter value={Number(v.product.utdQty)} onChange={value => editProduct(key, 'qty', value)} />
                  <InputCounter
                    value={v.defectiveQuantity}
                    onChange={value => editProduct(key, 'defectiveQuantity', value)}
                  />
                  <GridData>
                    <img
                      style={{ cursor: 'pointer' }}
                      src="/static/images/icons/close.svg"
                      onClick={() => deleteProduct(key)}
                    />
                  </GridData>
                </GridRowData>
              ))}
          </GridTable>
          <div className="row px-3 pb-4">
            <div className="col-md-12 text-end">
              <button className="btn btn-outline-secondary w-25 me-4 text-read">Cancel</button>
              <Button
                onClick={handleSubmit}
                variant="primary"
                size="medium"
                className="my-3"
                style={{ minWidth: '150px' }}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </CatalogueSection>
    </div>
  );
};

const CatalogueSection = styled.div`
  box-shadow: 0px 1px 10px rgb(39 52 67 / 8%);
  background: #fff;
  border-radius: 5px;
  .title {
    padding: 1rem 1.75rem;
    display: flex;
    border-bottom: 1px solid #e0e6ed;
  }
  .header {
    > h5 {
      > a {
        &:hover {
          background: transparent;
        }
      }
    }
    > .label {
      > a {
        &:hover {
          background: transparent;
        }
      }
    }
    padding: 1rem 1.75rem;
    .btn-primary {
      color: #657acb;
      background: #e2e8ff;
      border: 1px solid #e2e8ff;
    }
    .start-date {
      padding: 0.375rem 0.75rem;
      background: #ebeff5;
      border-radius: 5px;
      display: inline-flex;
      width: auto;
      margin-top: 1rem;
      margin-bottom: 0.75rem;
    }
  }
  .content {
    .table > :not(caption) > * > * {
      padding: 1rem 0.5rem;
      vertical-align: middle;
    }
    .table > :not(:first-child) {
      border-top: 0px;
    }
    td {
      img {
        width: 30px;
        height: auto;
      }
    }
  }
`;

const GridTable = styled.div`
  margin: 1rem -1.75rem;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr) 0.5fr;
  grid-gap: 1rem;
  padding: 0.5rem 1.75rem;
  justify-content: space-around;
  align-items: center;
  text-align: center;

  > div.alt-sku,
  > div.rrp {
    display: none;
  }

  @media screen and (min-width: 600px) {
    grid-template-columns: 1.5fr repeat(3, 1fr) 0.5fr;

    > div.alt-sku,
    > div.rrp {
      display: block;
    }
  }
`;

const GridRowHead = styled(GridRow)`
  background-color: #ebeff5;
`;

const GridRowData = styled(GridRow)`
  margin: 0.5rem 1.75rem;
  padding: 0;
  padding-bottom: 1rem;
  padding-top: 0.5rem;
  border-bottom: 1px solid #e0e6ed;
`;

const GridHead = styled.div`
  color: #3b4857;
`;

const GridData = styled.div`
  font-size: 12px;
  text-align: center;
`;

const ProductName = styled.div`
  font-size: 12px;
  text-align: left;

  @media screen and (min-width: 600px) {
    font-size: 14px;
  }
`;

const SubData = styled.span`
  color: #8492a5;
  font-size: 12px;
  text-align: left;
  display: block;
`;

export default Catalogue;
