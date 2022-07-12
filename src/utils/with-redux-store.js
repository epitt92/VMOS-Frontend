import React from 'react';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../models/reducers/index';
import logger from 'redux-logger';

const ENVIRONMENT = process.env.NEXT_PUBLIC_APP_ENVIRONMENT;
const middleware = [];

if (ENVIRONMENT === 'staging' || ENVIRONMENT === 'development') middleware.push(logger);

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(rootReducer, enhancer);

const AppWrapper = App => {
  return class Redux extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return <App {...this.props} store={store} />;
    }
  };
};

export default AppWrapper;
