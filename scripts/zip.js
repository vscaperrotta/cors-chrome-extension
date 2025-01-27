import fs from 'fs';
import archiver from 'archiver';

/**
 * Vite plugin that zips a folder (default "dist") at the end of the build process.
 *
 * @param {Object} [options={}] - Plugin options.
 * @param {string} [options.folderPath='dist'] - Path to the folder to be zipped.
 * @param {string} [options.outPath='dist.zip'] - Name or path of the output zip file.
 * @returns {import('vite').Plugin} A Vite plugin object.
 */
export default function zipBuildPlugin(options = {}) {
  const {
    folderPath = 'dist',
    outPath = 'dist.zip',
  } = options;

  return {
    name: 'zip-build-plugin',

    /**
     * Hook triggered after the Vite build process is completed.
     * It creates a ZIP archive of the specified folder.
     *
     * @async
     * @returns {Promise<void>}
     */
    async closeBundle() {
      try {
        console.log(`ZIP the folder "${folderPath}" into "${outPath}"...`);

        const output = fs.createWriteStream(outPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        archive.on('error', (err) => {
          throw err;
        });

        output.on('close', () => {
          console.log(`ZIP created: ${outPath} (${archive.pointer()} bytes)`);
        });

        archive.pipe(output);
        archive.directory(folderPath, false);

        await archive.finalize();
      } catch (error) {
        console.error(`Error during the ZIP creation: ${error}`);
      }
    },
  };
}
