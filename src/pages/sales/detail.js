import React from 'react';
import PropTypes from 'prop-types';
import { Detail } from 'containers/Sales';

const DetailPage = ({
  location_code,
  customergroup,
  location,
  address,
  description,
}) => {
  return (
    <Detail
      location_code={location_code}
      description={description}
      customergroup={customergroup}
      location={location}
      address={address}
    />
  )
}

export const getServerSideProps = async(context) => {
  const { 
    location_code = '', 
    description = '', 
    customergroup = '',
    location = '',
    address = ''
  } = context.query;

  return {
    props: {
      location_code,
      description,
      customergroup,
      location,
      address
    }
  }
}

export default DetailPage;
