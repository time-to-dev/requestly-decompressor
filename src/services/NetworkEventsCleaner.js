export class NetworkEventsCleaner {
  /**
   * Normalizes a URL by sorting its query parameters.
   * @param {string} url URL to be normalized.
   * @returns {string} Normalized URL.
   */
  static normalizeUrl(url) {
    try {
      const parsed = new URL(url);
      const params = Array.from(parsed.searchParams.entries()).sort(([a], [b]) => a.localeCompare(b));
      parsed.search = new URLSearchParams(params).toString();

      return parsed.origin + parsed.pathname + (params.length ? `?${parsed.search}` : '');
    } catch {
      return url;
    }
  }

  /**
   * Normalizes a JSON string by sorting its keys.
   * @param {string} jsonString JSON string to be normalized.
   * @returns {string} Normalized JSON string.
   */
  static normalizeJson(jsonString) {
    try {
      const obj = JSON.parse(jsonString);
      const sorted = this.sortObject(obj);

      return JSON.stringify(sorted);
    } catch {
      return jsonString;
    }
  }

  /**
   * Recursively sorts an object by its keys.
   * @param {any} obj Object to be sorted.
   * @returns {any} Sorted object.
   */
  static sortObject(obj) {
    if (Array.isArray(obj)) {
      return obj.map(this.sortObject);
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj)
        .sort()
        .reduce((res, key) => {
          res[key] = this.sortObject(obj[key]);

          return res;
        }, {});
    }

    return obj;
  }

  /**
   * Creates a unique comparison key for an event.
   * @param {Object} entry Event entry
   * @returns {string} Comparison string
   */
  static createComparableEntry(entry) {
    // eslint-disable-next-line no-unused-vars
    const { timestamp, responseTime, ...rest } = entry;

    return JSON.stringify({
      ...rest,
      url: this.normalizeUrl(entry.url),
      responseURL: this.normalizeUrl(entry.responseURL),
      requestData: this.normalizeJson(entry.requestData),
      response: this.normalizeJson(entry.response),
    });
  }

  /**
   * Removes duplicates from a list of network events.
   * @param {Array<Object>} events Array of events to be cleaned.
   * @returns {Array<Object>} Cleaned event list without duplicates.
   */
  static removeDuplicates(events) {
    const seen = new Set();

    return events.filter((event) => {
      const key = this.createComparableEntry(event);

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);

      return true;
    });
  }
}
