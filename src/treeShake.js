const { minify } = require("terser");

async function treeShake(code) {
  const result = await minify(code, {
    compress: {
      dead_code: true,
      unused: true,
    },
    mangle: true,
  });
  return result.code;
}

module.exports = treeShake;
