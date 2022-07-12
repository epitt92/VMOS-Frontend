# Vmos vendermac front end with next js
[![npm version](https://img.shields.io/badge/npm-v12.22.9-blue)](https://nodejs.org/en/blog/release/v12.22.9) [![npm version](https://img.shields.io/badge/npm-v16.13.2-blue)](https://nodejs.org/en/blog/release/v16.13.2) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

Description
- You can run this on local `yarn next` or `yarn start`
- Build the project with `yarn build`
- Auto deploy when there is changes
- Make a pull request if you want to add a feature or bug fix


**Swagger API Documentation**

https://staging.vendermac.com/api/doc/swagger-ui/index.html#/

Authentication Flow
1) GET JWT token via Azure SSO Login (https://staging.vendermac.com/login).
2) POST /api/auth
3) User Access token from response to unlock api
