import Amplify, { Auth, Hub, API } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

Amplify.configure({
  aws_cognito_region: process.env.NEXT_PUBLIC_COGNITO_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_COGNITO_POOL_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
  oauth: {
    domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
    scope: ['aws.cognito.signin.user.admin', 'email', 'openid'],
    redirectSignIn: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI,
    redirectSignOut: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI,
    responseType: 'code',
  },
  API: {
    endpoints: [
      {
        name: 'BackendAPI',
        endpoint: `${API_URL}/${API_VERSION}/`,
        custom_header: async () => {
          return { Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}` };
        },
      },
    ],
  },
  ssr: true,
});

export default { Auth, CognitoHostedUIIdentityProvider, Hub, API };
