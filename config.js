import Debug from 'debug';
const debug = Debug('src:config');

const nodeEnv = process.env.NODE_ENV;
const demoUser = process.env.DEMO_USER;
const demoPassword = process.env.DEMO_PASSWORD;
const hostUrl = process.env.API_HOST;
const publicUrl = process.env.PUBLIC_URL;
const serverConsoleUrl = process.env.SERVER_CONSOLE_URL;

const config = {
  nodeEnv,
  demoUser,
  demoPassword,
  hostUrl,
  publicUrl,
  serverConsoleUrl,
}

debug('Environment Variables (dev mode): \n\n%O', config);

export { nodeEnv, demoUser, demoPassword, hostUrl, publicUrl, serverConsoleUrl };

