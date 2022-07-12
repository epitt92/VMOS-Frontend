import React from 'react';
import { NewOrder } from 'containers/Orders';

const Order = ({ id = '' }) => {
  return <NewOrder id={id} />;
};

export const getServerSideProps = async context => {
  const { id = '' } = context.query;
  return {
    props: {
      id,
    },
  };
};

export default Order;
