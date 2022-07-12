import React from 'react';
import PropTypes from 'prop-types';
import { NewSingel } from 'containers/Orders';

const Order = ({ id, customergroup, location, address, location_code, description }) => {
  return (
    <NewSingel
      id={id}
      customergroup={customergroup}
      location={location}
      address={address}
      location_code={location_code}
      description={description}
    />
  );
};

export const getServerSideProps = async context => {
  const {
    id = '',
    customergroup = '',
    location = '',
    address = '',
    location_code = '',
    description = '',
  } = context.query;

  return {
    props: {
      id,
      customergroup,
      location,
      address,
      location_code,
      description,
    },
  };
};

export default Order;
