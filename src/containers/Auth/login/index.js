import React, { useState } from 'react';
import { LoginContainer, LoginCard } from './styled';
import { Input } from 'components';
import { useRouter } from 'next/router';
import Cognito from 'utils/cognito';

const Login = () => {
  const router = useRouter();
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const handleInput = type => e => {
    const { value } = e.target;
    setLogin(prev => ({ ...prev, [type]: value }));
    console.log(value);
  };
  return (
    <LoginContainer>
      <LoginCard>
        <div className="logo">
          <img src="/static/images/logo.svg" />
          <span>VENDERMAC</span>
        </div>
        <div className="body">
          <Input
            label={
              <span className="d-block" style={{ marginBottom: '0.625rem' }}>
                Username
              </span>
            }
            autoWidth={true}
            required="required"
            placeholder="Placeholder"
            value={login.username}
            name="title"
            title="Username"
            onChange={handleInput('username')}
          />
          <Input
            label={
              <span className="d-block" style={{ marginBottom: '0.625rem' }}>
                Password
              </span>
            }
            type="password"
            autoWidth={true}
            required="required"
            placeholder="Placeholder"
            value={login.password}
            name="title"
            title="OPassword"
            onChange={handleInput('password')}
          />
          <button type="button" className="login">
            Login
          </button>
          <hr />
          <button
            type="button"
            onClick={() =>
              Cognito.Auth.federatedSignIn({
                provider: 'AzureAD',
              })
            }
            className="login-sso">
            Login with SSO
          </button>
        </div>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
