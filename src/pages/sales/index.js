import React from 'react';
import PropTypes from 'prop-types';
import { Sales } from 'containers/Sales';

const SalesPage = ({
  customergroup,
  search
}) => {
  return (
    <Sales 
      customergroup={customergroup}
      search={search}
    />
  )
}

export const getServerSideProps = async(context) => {
  const { customergroup = '', search = '' } = context.query;

  return {
    props: {
      customergroup,
      search
    }
  }
}

export default SalesPage;
