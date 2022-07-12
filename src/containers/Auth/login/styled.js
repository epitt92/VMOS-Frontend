import styled from '@emotion/styled';

export const LoginContainer = styled.div`
  padding-top: 25vh;

  width: 100vw;
  height: 100vh;

  background: #e9ecf7;

  @media screen and (max-width: 768px) {
    /* padding-top: 0; */
  }
`;

export const LoginCard = styled.div`
  margin-left: auto;
  margin-right: auto;

  padding: 20px;

  width: 300px;
  height: 450px;
  background: #ffffff;

  > .logo {
    margin-top: 25px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  > .body {
    margin-top: 40px;

    > .login {
      width: 100%;
      height: 36px;

      padding: 8px 16px;

      background: #657acb;
      box-shadow: 0px 2px 3px rgba(101, 122, 203, 0.41);
      border-radius: 3px;
      border: none;

      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      color: #ffffff;

      :hover {
        background: #7a95ff;
        box-shadow: 0px 2px 10px rgba(122, 149, 255, 0.56);
        border-radius: 3px;
      }

      :active {
        background: #4761c5;
        box-shadow: 0px 2px 3px rgba(101, 122, 203, 0.41);
        border-radius: 3px;
      }
    }

    > hr {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    > .login-sso {
      width: 100%;
      height: 36px;

      background: #ffe0de;
      border-radius: 3px;
      border: none;

      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      color: #ff685e;
    }
  }
`;
