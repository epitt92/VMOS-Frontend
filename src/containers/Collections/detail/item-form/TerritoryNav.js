import React from 'react';
import styled from '@emotion/styled';

const TerritoryNav = ({ current, total, onChangePage }) => {
  return (
    <Root>
      <ButtonNav onClick={() => current > 1 && onChangePage(current - 1)}>
        <img src="/static/images/icons/arrow-left.svg" />
      </ButtonNav>
      <Nav>
        {current} / {total}
      </Nav>
      <ButtonNav onClick={() => current < total && onChangePage(current + 1)}>
        <img src="/static/images/icons/arrow-right.svg" />
      </ButtonNav>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;

const ButtonNav = styled.button`
  background: none;
  border: none;
  outline: none;
`;
const Nav = styled.span`
  color: #8492a5;
  text-align: center;
  display: block;
`;

export default TerritoryNav;
