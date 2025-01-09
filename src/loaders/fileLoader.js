const fs = require("fs");
const path = require("path");

function fileLoader(filename) {
  const outputPath = path.join("./dist", path.basename(filename));
  fs.copyFileSync(filename, outputPath);

  return `module.exports = "${path.basename(filename)}";`;
}

module.exports = fileLoader;
