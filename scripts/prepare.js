import { execSync } from 'node:child_process'
import paths from '../config/paths.js';

/**
 * This function is responsible for executing a script to generate a manifest file for the Chrome extension.
 *
 * @function writeManifest
 * @returns {void} This function does not return any value.
 */
function writeManifest() {
  execSync(`node ${paths.appScripts}/manifest.js`, { stdio: 'inherit' })
}

writeManifest()
