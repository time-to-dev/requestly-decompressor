#!/usr/bin/env node
import { Command } from 'commander';
import { processFiles } from '../src/index.js';

const program = new Command();

program
  .name('requestly-decompressor')
  .description('Decompression and clean-up of requestly sessions.')
  .version('1.0.0')
  .option('-s, --source <path>', 'Path to the source directory', './source')
  .option('-o, --output <path>', 'Path to the output folder', './output')
  .option('-v, --verbose', 'Activate detailed output', false)
  .option('-r, --unset-rrweb', 'Exclude RRWEB data from the exported JSON', false)
  .option('-n, --unset-network', 'Exclude network data from the exported JSON', false)
  .option('-d, --remove-duplicates', 'Remove duplicate entries from exported JSON', false)
  .option('-p, --prettify-content', 'Format and prettify the exported JSON data', false)
  .action((options) => {
    console.log(`Start processing...`);
    console.log(`📂 Source: ${options.source}`);
    console.log(`📂 Output: ${options.output}`);
    if (options.verbose) {
      console.log('📢 Verbose mode activated: Additional details are displayed.');
    }

    processFiles(
      options.source,
      options.output,
      options.verbose,
      options.unsetRrweb,
      options.unsetNetwork,
      options.removeDuplicates,
      options.prettifyContent
    );
  });

program.parse(process.argv);
