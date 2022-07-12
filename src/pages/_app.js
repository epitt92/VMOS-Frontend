import React from 'react';
import { Provider } from 'react-redux';
import Head from 'next/head';
import App from 'next/app';
import withReduxStore from 'utils/with-redux-store';

import 'assets/scss/main.scss';

import 'fontsource-metropolis';
import '@typefaces-pack/typeface-inter';
import { UIProvider } from 'hooks/ui-provider';
import 'react-toastify/dist/ReactToastify.css';
import Cognito from 'utils/cognito';
import { Login } from 'containers/Auth';

class Srr extends App {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    Cognito.Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          this.getUser().then(userData =>
            this.setState({
              user: userData,
            })
          );
          break;
        case 'signOut':
          this.setState({
            user: null,
          });
          break;
      }
    });
    this.getUser().then(userData => {
      this.setState({
        user: userData,
      });
    });
  }
  getUser() {
    return Cognito.Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <React.StrictMode>
        <Head>
          <title>VMOS</title>
        </Head>
        <Provider store={store}>
          <UIProvider>{this.state.user ? <Component {...pageProps} /> : <Login />}</UIProvider>
        </Provider>
      </React.StrictMode>
    );
  }
}

export default withReduxStore(Srr);
