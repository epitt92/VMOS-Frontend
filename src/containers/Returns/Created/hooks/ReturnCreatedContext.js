import React, { createContext, useContext, useState } from 'react';

const ReturnCreatedContext = createContext({});

export const ReturnCreatedProvider = props => {
  const [products, setProducts] = useState([]);

  const addProduct = product => {
    setProducts([...products, product]);
  };

  const deleteProduct = index => {
    products.splice(index, 1);
    setProducts([...products]);
  };

  const editProduct = (index, field, value) => {
    products[index] = { ...products[index], [field]: value };
    setProducts([...products]);
  };

  return (
    <ReturnCreatedContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        editProduct,
      }}>
      {props.children}
    </ReturnCreatedContext.Provider>
  );
};

export const useReturnCreated = () => useContext(ReturnCreatedContext);
