import React from 'react';
import { Details } from 'containers/Orders';

const Order = ({ id = '' }) => {
  return <Details id={id} />;
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
