import React from 'react';
import { Management } from 'containers/SupplierCatalogue';

const Product = () => {
  return <Management />;
};

export const getServerSideProps = async context => {
  const {} = context.query;

  return {
    props: {},
  };
};

export default Product;
