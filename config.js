import Debug from 'debug';

const debugConfig = Debug('src:config');

export const demoMode = true;
export const showConsole = false;

export const debug = process.env.DEBUG;
export const nodeEnv = process.env.NODE_ENV;
export const hostUrl = process.env.API_HOST;
export const demoUser = process.env.DEMO_USER;
export const publicUrl = process.env.PUBLIC_URL;
export const demoPassword = process.env.DEMO_PASSWORD;
export const serverConsoleUrl = process.env.SERVER_CONSOLE_URL;

if (debugConfig) {
  const config = {
    debug,
    hostUrl,
    nodeEnv,
    demoMode,
    demoUser,
    publicUrl,
    showConsole,
    demoPassword,
    serverConsoleUrl,
  };
  console.table(config);
}
