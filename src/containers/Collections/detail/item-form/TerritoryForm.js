import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Select, FlexBox, Input } from 'components';
import { useItemsCreator } from '../hooks';
import { ApiSupplierCollections } from 'api';

const TerritoryForm = ({ data, id, mode, isDirty, onAdd }) => {
  const { fetchItems } = useItemsCreator();
  const [state, setState] = useState({
    // territory: { label: data.territory || "", value: data.territory || "" },
    rrp: data.rrp,
    qty: data.qty,
    uom: { label: 'PCS', value: 'PCS' },
  });
  const [dirty, setDirty] = useState(isDirty);

  const territoryOptions = [
    { label: 'Singapore', value: 'Singapore' },
    { label: 'Malaysia', value: 'Malaysia' },
  ];
  const uomOptions = [
    { label: 'PCS', value: 'PCS' },
    { label: 'PKG', value: 'PKG' },
    { label: 'PAIRS', value: 'PAIRS' },
    { label: 'BOX', value: 'BOX' },
    { label: 'SETS', value: 'SETS' },
  ];

  const dispatch = (name, value) => {
    setState({ ...state, [name]: value });
    setDirty(true);
  };

  const handleConfirm = async () => {
    let itemData = {};
    itemData.name = data.name;
    itemData.cost = data.cost;
    itemData.product_code = data.productCode;
    itemData.currency = data.currency;
    itemData.upc = data.upc;
    itemData.imageUrl = data.imageUrl;

    itemData.territory = state.territory.value;
    itemData.rrp = state.rrp;
    itemData.qty = state.qty;
    itemData.uom = state.uom.value;

    if (mode === 'add') {
      await ApiSupplierCollections.createProducts(id, itemData);
    } else {
      itemData.id = data.id;
      await ApiSupplierCollections.updateProducts(id, itemData, {
        territory: itemData.territory,
        productCode: itemData.product_code,
      });
    }
    fetchItems(id);
  };

  useEffect(() => {
    if (!data) {
      return;
    }
    setDirty(isDirty);
    const territory = data.territory ? { label: data.territory, value: data.territory } : '';
    setState({
      ...state,
      territory,
      rrp: data.rrp || '',
      qty: data.qty || '',
      uom: { label: 'PCS', value: 'PCS' },
    });
  }, [data]);

  return (
    <>
      <Form>
        <div style={{ padding: '1.5rem 1rem' }}>
          <FormGroup style={{ marginBottom: '1rem' }}>
            <Select
              options={territoryOptions}
              background={`#fff`}
              border={`#D3DCE6`}
              margin={`1.25rem`}
              colorHover={`#fff`}
              colorSelected={`#fff`}
              color={`#212529`}
              backgroundSelected={`#828BAE`}
              custom={true}
              value={state.territory}
              onChange={value => dispatch('territory', value)}
              placeholder={`Select territory`}
            />
          </FormGroup>
          <FormGroup>
            <Input
              style={{ width: '100%' }}
              autoWidth={true}
              required="required"
              placeholder="RRP"
              value={state.rrp}
              onChange={e => dispatch('rrp', e.target.value)}
              name="RRP"
              title="RRP"
            />

            <Input
              style={{ width: '100%' }}
              autoWidth={true}
              required="required"
              placeholder="Qty"
              value={state.qty}
              onChange={e => dispatch('qty', e.target.value)}
              name="qty"
              title="qty"
            />

            <Select
              options={uomOptions}
              background={`#fff`}
              border={`#D3DCE6`}
              margin={`1.25rem`}
              colorHover={`#fff`}
              colorSelected={`#fff`}
              color={`#212529`}
              backgroundSelected={`#828BAE`}
              custom={true}
              value={state.uom}
              onChange={value => dispatch('uom', value)}
              placeholder={`UOM`}
            />
          </FormGroup>
        </div>
      </Form>
      <FlexBox style={{ justifyContent: 'center', marginBottom: '.5rem' }}>
        {dirty || mode === 'add' ? (
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        ) : (
          <ButtonAdd onClick={onAdd}>
            <img src="/static/images/icons/plus.svg" />
            Add Territories
          </ButtonAdd>
        )}
      </FlexBox>
    </>
  );
};

const FormGroup = styled(FlexBox)`
  padding: 0;
  gap: 1rem;

  > div {
    width: 100%;
    margin-bottom: 0;
  }

  input[type='text'] {
    min-width: auto;
  }
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

const ButtonAdd = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1.5rem;
  cursor: pointer;
  font-size: 12px;
  color: #657acb;
`;

export default TerritoryForm;
