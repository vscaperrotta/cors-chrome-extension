import path from 'path';
import fs from 'fs';

/**
 * The absolute path of the current working directory.
 * @type {string}
 */
const appDirectory = fs.realpathSync(process.cwd());

/**
 * Resolves a relative path to an absolute path based on the appDirectory.
 *
 * @param {string} relativePath - The relative path to resolve.
 * @returns {string} The absolute path.
 */
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

/**
 * The deployment path, defaulting to 'dist' if not specified in environment variables.
 * @type {string}
 */
const deployPath = process.env.DEPLOY_PATH || 'dist';

/**
 * An object containing various paths used throughout the application.
 *
 * @typedef {Object} AppPaths
 */

/**
 * The default export of the module, containing various paths used throughout the application.
 *
 * @type {AppPaths}
 */
const APP_PATHS = {
  appPath: resolveApp('.'),
  appAssets: resolveApp('assets'),
  appConfig: resolveApp('config'),
  appDist: resolveApp(deployPath),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appSrc: resolveApp('src'),
  appScripts: resolveApp('scripts'),
  appNodeModules: resolveApp('node_modules'),
  appPackageJson: resolveApp('package.json'),
};

export default APP_PATHS;