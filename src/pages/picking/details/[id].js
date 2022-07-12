import React from 'react';
import { PickDetails } from 'containers/Picking';

const PickOrderPage = ({ id }) => {
  return <PickDetails id={id}/>;
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
