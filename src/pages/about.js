import React from 'react';
import PropTypes from 'prop-types';
import About from 'containers/About';

export class AboutPage extends React.PureComponent {
  render() {
    return <About />;
  }
}

// AboutPage.propTypes = {
//   t: PropTypes.func,
// };

// AboutPage.getInitialProps = async () => ({
//   namespacesRequired: ['common', 'banner', 'features'],
// });

export default AboutPage;
