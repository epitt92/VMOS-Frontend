import React, { useEffect, useState } from 'react';
import { GridBox, Loading, Placeholder } from 'components';
import CostForm from './cost-form/CostForm';
import { ApiSupplierCollections } from 'api';

const CostCreator = ({ id, currency }) => {
  const [items, setItems] = useState();

  const handleAddItem = () => {
    setItems([...items, {}]);
  };

  const handleRemove = id => {
    items.splice(id, 1);
    setItems([...items]);
  };

  useEffect(async () => {
    const resp = await ApiSupplierCollections.getCost(id);
    setItems(resp.data.data);
  }, []);

  const handleSubmit = async (key, data) => {
    if (data.id) {
      await ApiSupplierCollections.updateCost(id, data.id, {
        currency: currency,
        cost: data.cost,
        description: data.description,
      });
    } else {
      const resp = await ApiSupplierCollections.createCost(id, {
        currency: currency,
        cost: data.cost,
        description: data.description,
      });
      console.log({ nngng: resp.data.data });
      items[key] = { ...data, id: resp.data.data.id };
      setItems([...items]);
    }
  };

  if (!items) {
    return (
      <div className="d-flex w-100 py-4 align-items-center justify-content-center">
        <Loading />
      </div>
    );
  }

  return (
    <GridBox rowItems={4} className="py-4" style={{ gap: '1.5rem' }}>
      {items &&
        items.map((data, key) => (
          <CostForm id={key} data={data} key={key} onSubmit={handleSubmit} onRemove={handleRemove} />
        ))}
      <Placeholder onClick={handleAddItem}>
        <img src="/static/images/icons/plus-create.svg" />
        <span>Add Additional Cost</span>
      </Placeholder>
    </GridBox>
  );
};

export default CostCreator;
