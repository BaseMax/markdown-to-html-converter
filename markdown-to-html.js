#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const marked = require("marked");

async function main() {
    const args = process.argv.slice(2);
    if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
        console.log(`
Usage:
  markdown-to-html [options]

Options:
  -i, --input <file>      Path to the input Markdown file (optional if using stdin)
  -o, --output <file>     Path to the output HTML file (optional)
  -h, --help              Show this help message

Examples:
  markdown-to-html -i input.md -o output.html
  cat input.md | markdown-to-html
        `);
        return;
    }

    let inputFilePath = null;
    let outputFilePath = null;

    // Parse command-line arguments
    for (let i = 0; i < args.length; i++) {
        if (args[i] === "-i" || args[i] === "--input") {
            inputFilePath = args[i + 1];
            i++;
        } else if (args[i] === "-o" || args[i] === "--output") {
            outputFilePath = args[i + 1];
            i++;
        }
    }

    let markdownContent = "";

    if (inputFilePath) {
        // Read Markdown from file
        try {
            markdownContent = fs.readFileSync(inputFilePath, "utf-8");
        } catch (err) {
            console.error(`Error: Unable to read input file '${inputFilePath}'.`);
            process.exit(1);
        }
    } else {
        // Read Markdown from stdin
        markdownContent = await readStdin();
    }

    // Validate Markdown content (basic validation example)
    if (!markdownContent.trim()) {
        console.error("Error: The Markdown content is empty.");
        process.exit(1);
    }

    // Convert Markdown to HTML
    const htmlContent = marked(markdownContent);

    if (outputFilePath) {
        // Write HTML to output file
        try {
            fs.writeFileSync(outputFilePath, htmlContent, "utf-8");
            console.log(`HTML successfully written to '${outputFilePath}'.`);
        } catch (err) {
            console.error(`Error: Unable to write to output file '${outputFilePath}'.`);
            process.exit(1);
        }
    } else {
        // Print HTML to stdout
        console.log(htmlContent);
    }
}

// Helper function to read from stdin
function readStdin() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });

        let data = "";
        rl.on("line", (line) => {
            data += line + "\n";
        });

        rl.on("close", () => {
            resolve(data);
        });
    });
}

main();
