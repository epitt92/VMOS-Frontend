import React from 'react';
import PropTypes from 'prop-types';
import { Status } from 'containers/Returns';

const Returns = ({
  id,
  // location_code
}) => {
  return (
    <Status
      // location_code={location_code}
      id={id} 
    />
  )
}

export const getServerSideProps = async(context) => {
  const {
    id = '',
    // location_code
  } = context.query;

  return {
    props: {
      id,
      // location_code
    }
  }
}

export default Returns;
