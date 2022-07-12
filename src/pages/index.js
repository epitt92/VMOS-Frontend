import React from 'react';
import PropTypes from 'prop-types';

import Home from 'containers/Home';

export class IndexPage extends React.PureComponent {
  render() {
    return <Home />;
  }
}

// IndexPage.propTypes = {
//   t: PropTypes.func,
// };

// IndexPage.getInitialProps = async () => ({
//   namespacesRequired: ['common', 'banner', 'features'],
// });

export default IndexPage;
