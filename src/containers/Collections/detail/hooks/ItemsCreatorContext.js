import { ApiSupplierCollections } from 'api';
import React from 'react';

const ItemsCreatorContext = React.createContext(
  {}
);

export const ItemsCreatorProvider = (props) => {
  const [items, setItems] = React.useState([]);

  const addItem = () => {
    setItems([...items, {}])
  }

  const updateItem = (id, data) => {
    items[id] = data
    setItems([...items])
  }

  const removeItem = (id) => {
    items.splice(id, 1)
    setItems([...items])
  }

  const fetchItems = async (id) => {
    const resp = await ApiSupplierCollections.getProducts(id)
    setItems(resp.data.data)
  }

  return (
    <ItemsCreatorContext.Provider
      value={{
        items,
        setItems,
        addItem,
        removeItem,
        updateItem,
        fetchItems,
      }}
    >
      {props.children}
    </ItemsCreatorContext.Provider>
  );
};

export const useItemsCreator = () => React.useContext(ItemsCreatorContext);
