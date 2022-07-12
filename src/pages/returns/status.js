import React from 'react';
import PropTypes from 'prop-types';
import { Status } from 'containers/Returns';

const StatusPage = ({
  search
}) => {
  return (
    <Status
      search={search}
    />
  )
}

export const getServerSideProps = async(context) => {
  const { search = '' } = context.query;

  return {
    props: {
      search
    }
  }
}

export default StatusPage;
