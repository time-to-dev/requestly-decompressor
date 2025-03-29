import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { SessionCompressor } from './services/SessionCompressor.js';
import { SessionExporter } from './services/SessionExporter.js';

/**
 * Processes a file by reading its content, decompressing events, extracting metadata, and exporting the session.
 *
 * @param {string} file - The name of the file to process.
 * @param {string} sourceDir - The directory containing the source file.
 * @param {string} outputDir - The directory where the processed file will be saved.
 * @param {boolean} verbose - Flag indicating whether to log detailed processing steps.
 * @param {boolean} unsetRrweb - Flag to exclude RRWEB data from the exported JSON.
 * @param {boolean} unsetNetwork - Flag to exclude network data from the exported JSON.
 * @return {Promise<void>} A promise that resolves when the file has been successfully processed.
 */
async function processFile(file, sourceDir, outputDir, verbose, unsetRrweb, unsetNetwork) {
  const filePath = path.join(sourceDir, file);

  if (verbose) {
    console.log(`📖 Read file: ${file}`);
  }

  try {
    const data = await fsp.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    const compressedEvents = jsonData?.data?.events;
    const metadata = jsonData?.data?.metadata;

    if (compressedEvents && metadata) {
      if (verbose) {
        console.log(`🔄 Decompress events...`);
      }

      const compressor = new SessionCompressor();
      compressor.decompress(compressedEvents);
      const events = compressor.getDecompressedData();

      const outputFileName = `${path.parse(file).name}`;

      if (verbose) {
        console.log(`🗂️ Export session: ${metadata.name || outputFileName}`);
      }

      const sessionExporter = new SessionExporter();
      sessionExporter.setMetadata(metadata);
      sessionExporter.setEvents(events);

      if (unsetRrweb) {
        console.log(`🗑️ Unset rrweb...`);
        sessionExporter.unsetRrweb();
      }

      if (unsetNetwork) {
        console.log(`🗑️ Unset network...`);
        sessionExporter.unsetNetwork();
      }

      sessionExporter.prepareSession();
      sessionExporter.save(outputFileName, outputDir);

      console.log(`✅ File successfully processed and exported: ${path.join(outputDir, outputFileName)}.json`);
    } else {
      console.log(`❌ No compressed events or metadata found in file ${file}.`);
    }
  } catch (error) {
    console.error(`❌ Error processing the file ${file}:`, error);
  }
}

/**
 * Processes all files in a specified source directory and outputs results to a target directory.
 * Allows optional logging and additional processing configurations.
 *
 * @param {string} [sourceDir='./source'] The directory path containing the source files to be processed.
 * @param {string} [outputDir='./output'] The directory path where processed files will be saved.
 * @param {boolean} [verbose=false] Flag indicating whether detailed logging should be enabled.
 * @param {boolean} [unsetRrweb=false] Optional flag for specific processing behavior related to rrweb.
 * @param {boolean} [unsetNetwork=false] Optional flag for specific processing behavior related to network processing.
 * @return {Promise<void>} A promise that resolves when all files are processed and saved to the output directory.
 */
export async function processFiles(sourceDir = './source', outputDir = './output', verbose = false, unsetRrweb = false, unsetNetwork = false) {
  try {
    if (!fs.existsSync(outputDir)) {
      await fsp.mkdir(outputDir, { recursive: true });
    }

    const files = await fsp.readdir(sourceDir);
    if (verbose) {
      console.log(`📂 Files found:`);
      files.forEach((file) => console.log(`   - ${file}`));
    }

    for (const file of files) {
      await processFile(file, sourceDir, outputDir, verbose, unsetRrweb, unsetNetwork);
    }

    if (verbose) {
      console.log('🏁 All files processed!');
    }
  } catch (error) {
    console.error('❌ Error in the file processing process:', error);
  }
}
