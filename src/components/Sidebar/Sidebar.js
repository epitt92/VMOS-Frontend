import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { menu } from 'helpers';
import { useRouter } from 'next/router';
import { Logo } from 'components';
import Cognito from 'utils/cognito';

const Wrapper = styled.div`
  box-shadow: 0px 6px 20px rgb(0 0 0 / 6%);
  background: #fff;
  display: inline-flex;
  flex-direction: column;
  z-index: 111;
  position: fixed;
  top: 0;
  height: 100%;
  left: 0;
  padding-left: 5px;
  max-width: 240px;

  > .logo {
    padding-top: 30px;
    padding-bottom: 30px;
    margin-left: 1.875rem;
    margin-right: 1.875rem;
    border-bottom: 1px solid #e0e6ed;
    margin-bottom: 30px;
  }

  > .menu {
    @media screen and (max-width: 1200px) {
      max-height: calc(100% - 240px);
    }
  }
  ul {
    list-style: none;
    padding: 0;
    height: 100%;
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 4px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #e0e6ed;
      border-radius: 11px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #b0bbcb;
      border-radius: 11px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    li {
      > a {
        display: flex;
        align-items: center;
        padding: 1.125rem 1.875rem;
        text-transform: uppercase;
        color: #8492a5;
      }
    }
  }

  > button {
    position: absolute;

    left: 10%;
    bottom: 40px;

    width: 180px;
    height: 36px;

    background: #ffffff;
    border: 1px solid #d3dce6;
    box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
    border-radius: 3px;

    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    text-align: right;
    color: #657acb;

    > img {
      margin-left: 50px;
    }
  }
`;

const Full = styled.div`
  /* background: red; */
  width: 0px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  @media screen and (max-width: 1200px) {
    width: 100%;
    display: ${props => (props.isMenu ? 'block' : 'none')};
  }
`;

const Sidebar = ({ isMenu = '', openMenu = '' }) => {
  const router = useRouter();
  return (
    <Full isMenu={isMenu} onClick={() => openMenu(false)}>
      <Wrapper>
        <Logo className="logo" />
        <div className="menu">
          <ul className="sidebar-menu">
            {menu.map(any => {
              return (
                <li
                  className={
                    router.pathname.includes(any.slug)
                      ? `${any.slug} active sidebar-menu-item`
                      : `${any.slug} sidebar-menu-item`
                  }
                  key={any.id}>
                  <Link href={`/${any.slug}`}>
                    <a>{any.label}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <button onClick={() => Cognito.Auth.signOut()}>
          Logout
          <img src="/static/images/icons/logout.svg" />
        </button>
      </Wrapper>
    </Full>
  );
};

// Wrapper.propTypes = {
//   t: PropTypes.func,
// };

export default Sidebar;
