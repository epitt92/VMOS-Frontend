import React, { useEffect } from 'react';
import { GridBox, Loading, Placeholder } from 'components';
import ItemForm from './item-form/ItemForm';
import ItemTerritory from './item-form/ItemTerritory';
import { ApiCollections } from 'api';
import useSWR from 'swr';
import { useItemsCreator } from './hooks';

const fetchInitialProperties = async () => {
  const [namecodes, classifications, itembrands] = await Promise.all([
    ApiCollections.getNameCodes(),
    ApiCollections.getClassifications(),
    ApiCollections.getItemBrands(),
  ]);
  console.log('classifica', classifications);
  return { namecodes: namecodes.data.data.items, classifications: classifications.data.data.items, itembrands: itembrands.data.data.items };
};

const ItemsCreator = ({ id, step }) => {
  const { items, addItem, fetchItems } = useItemsCreator();
  const { data, error } = useSWR([id, step], () => fetchInitialProperties(), {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });

  const namecodes =
    data && data.namecodes
      ? data.namecodes.map(n => {
          return { label: n.name, value: n.code };
        })
      : [];
  const classifications =
    data && data.classifications
      ? data.classifications.map(c => {
          return { label: c.name, value: c.code };
        })
      : [];
  
  const itembrands =
    data && data.itembrands
      ? data.itembrands.map(c => {
          return { label: c.name, value: c.code };
        })
      : [];

  useEffect(() => {
    if (step > 1) {
      fetchItems(id);
    }
  }, [id, step]);

  if (!data && !error) {
    return (
      <div className="d-flex w-100 py-4 align-items-center justify-content-center">
        <Loading />
      </div>
    );
  }

  const renderItemForms = () => {
    return (
      <>
        {items.map((data, key) => (
          <ItemForm
            namecodes={namecodes}
            classifications={classifications}
            itembrands={itembrands}
            collectionId={id}
            id={key}
            data={data}
            key={key}
          />
        ))}

        <Placeholder style={{ minHeight: '400px' }} onClick={addItem}>
          <img src="/static/images/icons/plus-create.svg" />
          <span>Add Product</span>
        </Placeholder>
      </>
    );
  };

  const renderItemsTerritory = () => {
    let territoryData = [];
    let mapped = {};
    let index = 0;
    for (const d of items) {
      if (typeof mapped[d.productCode] != 'undefined') {
        territoryData[mapped[d.productCode]].push(d);
        continue;
      }
      mapped[d.productCode] = index;
      territoryData[index] = [d];
      index++;
    }

    return territoryData.map((data, key) => (
      <ItemTerritory collectionId={id} id={id} data={data} index={key} key={key} />
    ));
  };

  return (
    <GridBox className="py-4" style={{ gap: '1.5rem' }}>
      {step == 1 && renderItemForms()}
      {step == 2 && renderItemsTerritory()}
    </GridBox>
  );
};

export default ItemsCreator;
