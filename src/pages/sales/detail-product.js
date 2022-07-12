import React from 'react';
import PropTypes from 'prop-types';
import { DetailProduct } from 'containers/Sales';

const DetailProductPage = ({
  location_code,
  search,
  customergroup,
  location,
  address
}) => {
  return (
    <DetailProduct 
      location_code={location_code}
      search={search}
      address={address}
      customergroup={customergroup}
      location={location}
    />
  )
}

export const getServerSideProps = async(context) => {
  const { 
    location_code = '', 
    search = '',
    customergroup = '',
    location = '',
    address = ''
} = context.query;

  return {
    props: {
      location_code,
      search,
      customergroup,
      location,
      address,
    }
  }
}

export default DetailProductPage;
