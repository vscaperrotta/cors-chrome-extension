import fs from 'fs-extra';
import { getManifest } from '../src/manifest.js';

/**
 * Writes the manifest.json file to the 'dist' directory.
 *
 * This function uses the 'fs-extra' library to asynchronously write the manifest data
 * obtained from the 'getManifest' function to a JSON file named 'manifest.json' in the 'dist' directory.
 *
 * @async
 * @function writeManifest
 * @returns {void}
 */
async function writeManifest() {
  fs.writeJSON('dist/manifest.json', await getManifest(), 'utf8');
}

writeManifest()
