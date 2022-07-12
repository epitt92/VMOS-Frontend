import React from 'react';
import { MobilePickingSummary } from 'containers/Picking';

const SummaryPage = ({ id }) => {
  return <MobilePickingSummary id={id}/>;
};

export const getServerSideProps = async context => {
  const { id } = context.query;

  return {
    props: {
      id
    },
  };
};

export default SummaryPage;
