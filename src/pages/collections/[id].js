import React from 'react';
import { CollectionDetail } from 'containers/Collections';

const CollectionDetailPage = ({id, step}) => {
  return <CollectionDetail id={id} step={step}/>;
};

export const getServerSideProps = async context => {
  const {id, step = 1} = context.query;

  return {
    props: {
      id,
      step
    },
  };
};

export default CollectionDetailPage;
