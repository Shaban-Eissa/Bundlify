const fs = require("fs");
const path = require("path");
const babylon = require("babylon");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");
const cssLoader = require("./loaders/cssLoader");
const fileLoader = require("./loaders/fileLoader");

let ID = 0;

function createAsset(filename) {
  const content = fs.readFileSync(filename, "utf-8");

  let code;
  if (filename.endsWith(".css")) {
    code = cssLoader(content);
  } else if (filename.endsWith(".png") || filename.endsWith(".jpg")) {
    code = fileLoader(filename);
  } else {
    try {
      const ast = babylon.parse(content, {
        sourceType: "module",
        plugins: ["dynamicImport"], 
      });
      const { code: transformedCode } = transformFromAst(ast, null, {
        presets: ["@babel/preset-env"],
      });
      code = transformedCode;
    } catch (error) {
      console.error(`Error parsing file: ${filename}`); 
      throw error;
    }
  }

  const id = ID++;

  return {
    id,
    filename,
    dependencies: getDependencies(filename, content),
    code,
  };
}

function getDependencies(filename, content) {
  const dependencies = [];
  
  if (!filename.endsWith(".js")) {
    return dependencies;
  }

  try {
    const ast = babylon.parse(content, {
      sourceType: "module",
      plugins: ["dynamicImport"], 
    });
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      },
      CallExpression: ({ node }) => {
        if (
          node.callee.type === "Import" &&
          node.arguments.length === 1 &&
          node.arguments[0].type === "StringLiteral"
        ) {
          dependencies.push(node.arguments[0].value);
        }
      },
    });
  } catch (error) {
    console.error(`Error parsing dependencies in file: ${filename}`); 
    throw error;
  }

  return dependencies;
}

module.exports = createAsset;
