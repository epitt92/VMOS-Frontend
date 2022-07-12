import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled(`header`)`
  left: 0;
  width: 100%;
  height: 64px;
  position: sticky;
  top: 0px;
  z-index: 110;
  border-bottom: 1px solid #e0e6ed;
  align-items: center;
  display: flex;
  padding-left: 30px;
  padding-right: 30px;
  background: #f6f7f9;
  .input-group {
    .form-control {
      &::placeholder {
        color: #8492a5;
      }
      &:focus {
        outline: 0;
        box-shadow: none;
      }
    }
    > img {
      width: 20px;
      height: auto;
    }
  }
  .nav-link {
    color: #8492a5;
  }

  .desktop {
    @media screen and (max-width: 1200px) {
      display: none;
    }
  }

  .header {
    display: none;
    flex-direction: row;
    align-items: center;

    @media screen and (max-width: 1200px) {
      display: flex;
    }

    > .menu-bar {
      > img {
        cursor: pointer;
      }
    }

    > .header-logo {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      @media screen and (max-width: 567px) {
        display: none;
      }

      > .logo {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 32px;

        > img {
        }

        > span {
          font-weight: 700;
          font-size: 16px;
          line-height: 22px;
          /* identical to box height */

          text-transform: uppercase;
          color: #3b4857;
        }
      }

      > .search {
        position: relative;

        > input {
          padding-left: 30px;
          width: 160px;
          height: 31px;
          text-align: left;
          background: #ffffff;

          box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
          border-radius: 3px;
          /* transform: matrix(-1, 0, 0, 1, 0, 0); */
          border: none;
          outline: none;
        }

        > img {
          position: absolute;
          width: 13px;
          height: 13px;
          top: 9px;
          left: 10px;
        }
      }
    }
  }
`;

const Header = ({ openMenu = '' }) => {
  return (
    <Wrapper>
      <div className="row align-items-center w-100">
        <div className="col">
          <div className="header">
            <div className="menu-bar">
              <img onClick={() => openMenu(true)} src="/static/images/icons/menu.svg" />
            </div>
            <div className="header-logo">
              <div className="logo">
                <img src="/static/images/logo.svg" />
                <span>VENDERMAC</span>
              </div>
              <div className="search">
                <img src="/static/images/icons/search.svg" alt="Search" />
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="desktop input-group border-0">
            <span className="input-group-text pe-1 bg-transparent border-0" id="basic-addon1">
              <img src="/static/images/icons/search.svg" alt="Search" />
            </span>
            <input
              type="text"
              className="form-control border-0"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
          </div>

          {/*           
          <div className='input-group border-0'>
            <span className='input-group-text pe-1 bg-transparent border-0' id='basic-addon1'>
              <img src="/static/images/icons/search.svg" alt="Search" />
            </span>
            <input type='text' className='form-control border-0' placeholder='Search' aria-label='Search' aria-describedby='basic-addon1' />
          </div> */}
        </div>
        {/* <div className="col-3 ms-auto text-end">
          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              Oliver Sykes
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </Wrapper>
  );
};

// Header.propTypes = {
//   t: PropTypes.func,
// };

export default Header;
