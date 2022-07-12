import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from "next/router";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: 'OpenSans Bold';
  > img{
    width: 30px;
    height: auto;
  }
`

const Logo = ({className}) => {
  return (
    <Wrapper className={className}>
      <img src="/static/images/logo.svg" alt="VenderMac Logo" />
      VenderMac
    </Wrapper>
  );
}

// Wrapper.propTypes = {
//   t: PropTypes.func,
// };

export default Logo;
