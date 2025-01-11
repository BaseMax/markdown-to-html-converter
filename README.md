# Markdown to HTML Converter

A simple CLI tool for converting Markdown content to HTML, built with Node.js.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BaseMax/markdown-to-html-converter
   cd markdown-to-html-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make the CLI executable:
   ```bash
   chmod +x index.js
   ```

4. Link the tool globally:
   ```bash
   npm link
   ```

## Usage

```bash
Usage:
  markdown-to-html [options]

Options:
  -i, --input <file>      Path to the input Markdown file (optional if using stdin)
  -o, --output <file>     Path to the output HTML file (optional)
  -h, --help              Show this help message

Examples:
  markdown-to-html -i input.md -o output.html
  cat input.md | markdown-to-html
```

### Examples

1. Convert a Markdown file to HTML and save it to an output file:
   ```bash
   markdown-to-html -i input.md -o output.html
   ```

2. Convert Markdown from standard input:
   ```bash
   cat input.md | markdown-to-html
   ```

3. Print the converted HTML to the console:
   ```bash
   markdown-to-html -i input.md
   ```

## License

MIT

(c) Copyright 2025, Max Base
