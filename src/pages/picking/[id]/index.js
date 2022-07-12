import React from 'react';
import { PickOrder } from 'containers/Picking';

const PickOrderPage = ({ id }) => {
  return <PickOrder id={id}/>;
};

export const getServerSideProps = async context => {
  const { id } = context.query;

  return {
    props: {
      id
    },
  };
};

export default PickOrderPage;
