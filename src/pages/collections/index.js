import React from 'react';
import { CollectionMain } from 'containers/Collections';

const CollectionsPage = ({ page, status, search, sortOrder, sort }) => {
  return <CollectionMain page={page} status={status} search={search} sortOrder={sortOrder} sort={sort} />;
};

export const getServerSideProps = async context => {
  const { page = 1, sort = 'createdAt:desc', status = 'all', search = '' } = context.query;

  return {
    props: {
      status,
      search,
      sort,
      page,
    },
  };
};

export default CollectionsPage;
