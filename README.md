# Requestly Decompressor

## 📌 Project Overview

The **Requestly Decompressor** is a tool designed for compressing, decompressing, and processing Requestly session files. This project helps convert compressed session files into easily readable JSON formats, facilitating analysis and further processing.

---

## ⚙️ Main Features

- Compression and decompression of events within Requestly sessions.
- Export sessions to well-structured JSON.
- User-friendly CLI operation and easy integration into existing Node.js projects.
- Configurable with custom-defined source and target directories.
- Optional detailed CLI output (`--verbose`).
- Exclude RRWEB data from exported JSON outputs (`--unset-rrweb`).
- Exclude network activity data from exported JSON outputs (`--unset-network`).

---

## 🔧 Requirements

Ensure your system meets the following prerequisites:

- [Node.js](https://nodejs.org) (Version 18.x or higher recommended)
- npm (pre-installed with Node.js)

---

## 📦 Installation

### 🔹 Global Installation

Would you like to use the tool globally, system-wide?

```bash
npm install -g @time-to-dev/requestly-decompressor .
```

### 🔸 Direct Usage Without Installation (Using NPX)

```bash
npx requestly-decompressor
```

---

## 📖 Usage

The CLI provides the following options:

### Default Invocation

```bash
requestly-decompressor
```

### NPX Invocation with Default Directories

```bash
npx requestly-decompressor
```

By default, the following directories are used:

- Input directory (`input`): `./source`
- Output directory (`output`): `./output` will be automatically created if it does not exist.

### Custom Source and Destination Directories

If you want to set custom paths:

```bash
npx requestly-decompressor --source ./my-files --output ./my-results
```

### Verbose Mode (Detailed Output)

To get additional details during processing:

```bash
npx requestly-decompressor --verbose
```

---

## 🚀 Integration as a Node.js Module

Use the tool directly within your Node.js code as a module:

```javascript
import { processFiles } from 'requestly-decompressor';

// Default directories (./source as input and ./output as output)
processFiles();

// Or with custom paths and verbose logging:
processFiles('./my-input-folder', './my-output-folder', true);
```

---

## 📗 Explanation of Key Components

### SessionCompressor

Responsible for efficient compression and decompression of events within session files.

### SessionExporter

Handles structured generation and export of session data into JSON format with metadata and events.

### Process Management (`index.js`)

The central workflow for reading, processing, and writing session files.

### CLI Interface (`cli.js`)

A comfortable command line interface (CLI) for easy management and configuration of all available features.

---

## 🖥️ CLI Options Overview

| Option                | Description                                                                                                                | Default    |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `-s, --source <path>` | Path to source directory                                                                                                   | `./source` |
| `-o, --output <path>` | Path to output directory                                                                                                   | `./output` |
| `-v, --verbose`       | Activate detailed output                                                                                                   | `false`    |
| `-r, --unset-rrweb`   | Exclude RRWEB data from the exported JSON file. Use this parameter if you do not need RRWEB recordings in your output.     | `false`    |
| `-n, --unset-network` | Exclude network data from the exported JSON file. Use this parameter if you do not need network activities in your output. | `false`    |

**Example Call**:

```bash
npx requestly-decompressor -s ./input-folder -o ./output-folder -v
```

---

## 🛡️ Error Management & Logging

The program clearly handles errors with detailed logs when necessary, especially in "verbose mode", quickly pinpointing potential issues.

---

## 📢 Support & Contribution

Found a bug, have questions or suggestions? Please create an issue on the corresponding [GitHub Repository](https://github.com/time-to-dev/requestly-decompressor), or send a Pull Request with your improvement.

---

## 📝 License

This project is licensed under the MIT-License. See [LICENSE](https://github.com/time-to-dev/requestly-decompressor?tab=MIT-1-ov-file) for more information.
