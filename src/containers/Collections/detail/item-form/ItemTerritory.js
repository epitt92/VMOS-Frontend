import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Input, Select, FlexBox, FloatingButton, Button } from 'components';
import TerritoryForm from './TerritoryForm';
import TerritoryNav from './TerritoryNav';
import ItemFormDrawer from './ItemFormDrawer';
import { useDrawer } from 'components/Drawer/hooks/DrawerContext';

const ItemTerritory = ({ id, onRemove, data, step }) => {
  const [mode, setMode] = useState('view');
  const [currentPage, setCurrentPage] = useState(1);
  const territoryData = data[0];

  const { drawer } = useDrawer();

  const handleShowDrawer = () => {
    drawer({
      render: onClose => <ItemFormDrawer data={data[currentPage - 1]} onClose={onClose} />,
    });
  };

  const handlePrepareAdd = () => {
    setMode('add');
    data.push({ ...data[0], rrp: '', qty: '' });
    setCurrentPage(data.length);
  };

  return (
    <Root>
      <FloatingButton onClick={handleShowDrawer}>
        <img style={{ width: '12px', height: '12px' }} src="/static/images/icons/edit.svg" />
      </FloatingButton>
      <ProductSummary>
        <img src={`${process.env.NEXT_PUBLIC_ASSET_BASE_URL}/${territoryData.imageUrl}`} />
        <div>
          <h4>{territoryData.name}</h4>
          <p>{territoryData.upc}</p>
          <ProductMeta>
            <div>
              <label>Qty per Ctn</label>
              <p>{territoryData.qty}</p>
            </div>
            <div>
              <label>Cost</label>
              <p>${territoryData.cost}</p>
            </div>
          </ProductMeta>
        </div>
      </ProductSummary>
      <TerritoryNav current={currentPage} onChangePage={p => setCurrentPage(p)} total={data.length} />
      {mode == 'add' && (
        <TerritoryForm
          data={data[0]}
          id={id}
          mode="add"
          onAdd={handlePrepareAdd}
          isDirty={data.length === 1 && !data[0].qty}
        />
      )}
      {mode == 'view' && (
        <TerritoryForm
          data={data[currentPage - 1]}
          id={id}
          mode="edit"
          onAdd={handlePrepareAdd}
          isDirty={data.length === 1 && !data[0].qty}
        />
      )}
      {data.length == 0 && (
        <Form>
          <div className="no-territory">
            <p>No territory</p>
          </div>
        </Form>
      )}
    </Root>
  );
};

const Root = styled.div`
  position: relative;
  background: white;
  border: 1px solid #ebeff5;
  border-radius: 3px;
`;

const Form = styled.div`
  display: flex;
  margin: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  flex-direction: column;
  background: #f6f7f9;
  border: 1px solid #ebeff5;
  border-radius: 3px;
  min-height: 126px;

  .no-territory {
    display: flex;
    flex-grow: 1;
    text-align: center;
    color: #b0bbcb;
    font-size: 12px;
    align-items: center;
    justify-content: center;

    p {
      margin-bottom: 0;
    }
  }
`;

const ProductSummary = styled.div`
  margin: 1.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  gap: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e6ed;

  h4 {
    font-size: 14px;
  }

  > img {
    width: 72px;
    height: 72px;
  }

  > div {
    display: flex;
    flex-direction: column;

    > p {
      color: #8492a5;
      font-size: 12px;
    }
  }
`;

const ProductMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 12px;

  label {
    color: #8492a5;
  }

  p {
    font-weight: bold;
  }
`;

export default ItemTerritory;
