
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.'
  );
}

const config = {
  port: process.env.PORT ,
  // TODO: Figure out proxy
  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY,

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL,
    // API URL to be used in the server-side code
    serverUrl:
      process.env.API_SERVER_URL
  }
};

export default config;
