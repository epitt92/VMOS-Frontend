import React from 'react';
// import PropTypes from 'prop-types';
import { Orders } from 'containers/Orders';

const OrdersPage = ({ status = '', search = '', sortOrder = '', sort = '' }) => {
  return <Orders status={status} search={search} sortOrder={sortOrder} sort={sort} />;
};

export const getServerSideProps = async context => {
  const { sort = 'id', sortOrder = 'desc', status = 'all', search = '' } = context.query;

  return {
    props: {
      status,
      search,
      sortOrder,
      sort,
    },
  };
};

export default OrdersPage;
