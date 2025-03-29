import { strFromU8, strToU8, zlibSync, unzlibSync } from 'fflate';

/**
 * Class responsible for compressing and decompressing session event data.
 */
export class SessionCompressor {
  /**
   * Initializes a new instance of the SessionCompressor class.
   */
  constructor() {
    this.compressedData = null;
    this.decompressedData = null;
  }

  /**
   * Compresses the given session event data and stores it internally.
   *
   * @param {Object} events - The session event data to compress.
   */
  compress(events) {
    this.compressedData = strFromU8(zlibSync(strToU8(JSON.stringify(events))), true);
  }

  /**
   * Retrieves the compressed session event data.
   *
   * @returns {string|null} The compressed event data as a string, or null if compression has not been performed yet.
   */
  getCompressedData() {
    return this.compressedData;
  }

  /**
   * Decompresses the provided compressed session event data and stores the result internally.
   *
   * @param {string} compressedEvents - The compressed session event data as a string.
   */
  decompress(compressedEvents) {
    this.decompressedData = JSON.parse(strFromU8(unzlibSync(strToU8(compressedEvents, true))));
  }

  /**
   * Retrieves the decompressed session event data.
   *
   * @returns {Object|null} The decompressed session events data object, or null if decompression has not been performed yet.
   */
  getDecompressedData() {
    return this.decompressedData;
  }
}
