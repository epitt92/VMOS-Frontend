import React from 'react';
import PropTypes from 'prop-types';
import { Created } from 'containers/Returns';

const CreatedPage = ({ search, id }) => {
  return <Created id={id} search={search} />;
};

export const getServerSideProps = async context => {
  const { search = '', id = '' } = context.query;

  return {
    props: {
      search,
      id,
    },
  };
};

export default CreatedPage;
