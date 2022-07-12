import React from 'react';
import { PickingMain } from 'containers/Picking';

const PickingPage = ({ status, search, sortOrder, sort, page }) => {
  return <PickingMain status={status} search={search} sortOrder={sortOrder} sort={sort} page={page} />;
};

export const getServerSideProps = async context => {
  const { sort = 'date', sortOrder = 'desc', status = 'processing', search = '', page = 1 } = context.query;

  return {
    props: {
      status,
      search,
      sortOrder,
      sort,
      page,
    },
  };
};

export default PickingPage;
