import fs from 'fs';
import path from 'path';

const SESSION_EXPORT_TYPE = 'SESSION';
const EXPORTED_SESSION_FILE_EXTENSION = 'json';
const OUTPUT_DIR_DEFAULT = 'output';

export class SessionExporter {
  constructor() {
    this.metadata = null;
    this.events = null;
    this.fileContent = null;
  }

  /**
   * Sets the metadata for the current session or recording with the provided information.
   *
   * @param {Object} metadata - An object containing metadata information, including the name, session attributes, and optional recording mode.
   * @return {void} This method does not return a value.
   */
  setMetadata(metadata) {
    this.metadata = metadata;
  }

  /**
   * Sets the events for the current instance.
   *
   * @param {Array|Object} events - The events to be set, can be an array or an object containing event data.
   * @return {void} Returns nothing.
   */
  setEvents(events) {
    this.events = events;
  }

  /**
   * Removes the 'rrweb' property from the events object within metadata data.
   *
   * @return {void} Does not return any value.
   */
  unsetRrweb() {
    delete this.events.rrweb;
  }

  /**
   * Removes the network property from the metadata's data events object.
   *
   * @return {void} Does not return any value.
   */
  unsetNetwork() {
    delete this.events.network;
  }

  /**
   * Prepares a session object for export by formatting the events and metadata,
   * and converting it into a JSON string.
   *
   * @return {void} This method does not return a value but updates the fileContent property with the session data.
   */
  prepareSession() {
    const sessionToExport = {
      version: 1,
      type: SESSION_EXPORT_TYPE,
      data: {
        events: this.events,
        metadata: this.metadata,
      },
    };

    this.fileContent = JSON.stringify(sessionToExport);
  }

  /**
   * Formats the JSON content within the fileContent property to be more readable.
   * The method parses the current fileContent as JSON, then re-serializes it with indentation.
   *
   * @return {void} This method does not return a value.
   */
  prettifyContent() {
    const parsed = JSON.parse(this.fileContent);
    this.fileContent = JSON.stringify(parsed, null, 4);
  }

  /**
   * Saves the session content to a file in the specified output directory.
   *
   * @param {string} fileName - The name of the file to save the session content to, without file extension.
   * @param {string} [outputDir=OUTPUT_DIR_DEFAULT] - The directory where the file will be saved. Defaults to the constant OUTPUT_DIR_DEFAULT if not provided.
   * @throws {Error} Throws an error if the session content is empty or if there is a problem writing the file.
   * @return {void}
   */
  save(fileName, outputDir = OUTPUT_DIR_DEFAULT) {
    if (!this.fileContent) {
      throw new Error('Session content is empty. Please call prepareSession first.');
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filePath = path.join(outputDir, `${fileName}.${EXPORTED_SESSION_FILE_EXTENSION}`);

    try {
      fs.writeFileSync(filePath, this.fileContent, 'utf8');
    } catch (error) {
      throw new Error(`❌ Error when saving the session file ${filePath}: ${error.message}`);
    }
  }
}
