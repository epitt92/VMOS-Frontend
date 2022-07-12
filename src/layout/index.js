import React from 'react';
import PropTypes from 'prop-types';
import { Header, Footer, Sidebar, Toast } from 'components';
import styled from '@emotion/styled';

const Content = styled.div`
  width: calc(100% - 240px);
  margin-left: 240px;

  @media screen and (max-width: 1200px) {
    margin-left: 0;
    width: 100%;
  }
`;

const Body = styled.div`
  padding: 30px;

  @media screen and (max-width: 640px) {
    padding: 0;
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

function Layout({ children }) {
  const [isMenu, setIsMenu] = React.useState(false);

  const openMenu = flag => {
    console.log('open');
    setIsMenu(flag);
  };

  return (
    <>
      <Toast />
      <Wrapper>
        {/* {isTablet ? '' : <Sidebar />} */}
        <Sidebar openMenu={openMenu} isMenu={isMenu} />
        <Content>
          <Header openMenu={openMenu} />
          <Body>{children}</Body>
        </Content>
        <Footer />
      </Wrapper>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
