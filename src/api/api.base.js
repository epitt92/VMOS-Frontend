import Cognito from 'utils/cognito';

const base = () => {
  return {
    get: (path, headers) => {
      if (headers) {
        headers.response = true;
      } else {
        headers = {
          response: true,
        };
      }
      return Cognito.API.get('BackendAPI', path, headers);
    },
    post: (path, body, headers) => {
      if (headers) {
        headers.response = true;
        headers.body = body;
        // myInit = headers
      } else {
        headers = {
          response: true,
          body,
        };
      }
      return Cognito.API.post('BackendAPI', path, headers);
    },
    patch: (path, body, headers) => {
      if (headers) {
        headers.response = true;
        headers.body = body;
        // myInit = headers
      } else {
        headers = {
          response: true,
          body,
        };
      }
      return Cognito.API.patch('BackendAPI', path, headers);
    },
    delete: (path, body, headers) => {
      if (headers) {
        headers.response = true;
        headers.body = body;
        // myInit = headers
      } else {
        headers = {
          response: true,
          body,
        };
      }
      return Cognito.API.delete('BackendAPI', path, headers);
    },
    put: (path, body, headers) => {
      if (headers) {
        headers.response = true;
        headers.body = body;
        // myInit = headers
      } else {
        headers = {
          response: true,
          body,
        };
      }
      return Cognito.API.put('BackendAPI', path, headers);
    },
  };
};

export default base;
