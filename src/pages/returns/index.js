import React from 'react';
import PropTypes from 'prop-types';
import { Returns } from 'containers/Returns';

const ReturnsPage = ({
  status,
  search,
  sortOrder,
  sort
}) => {
  return (
    <Returns 
      status={status}
      search={search}
      sortOrder={sortOrder}
      sort={sort}
    />
  )
}

export const getServerSideProps = async(context) => {
  const { 
    sort = 'id',
    sortOrder = 'desc',
    status = 'all', 
    search = ''
  } = context.query;

  return {
    props: {
      status,
      search,
      sortOrder,
      sort
    }
  }
}

export default ReturnsPage;
