import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from 'layout';

const About = () => {
  const { isAuthenticated, isLoading, user, role } = useSelector(state => state.appReducer);
  return (
    <Layout>
      Hello About
    </Layout>
  );
}

export default About;
