function bundle(graph) {
  let modules = "";

  graph.forEach((mod) => {
    modules += `${mod.id}: [
      function (require, module, exports) {
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)},
    ],`;
  });

  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];

        function localRequire(relativePath) {
          return require(mapping[relativePath]);
        }

        const module = { exports: {} };
        fn(localRequire, module, module.exports);
        return module.exports;
      }

      require(0);
    })({${modules}})
  `;

  return result;
}

module.exports = bundle;
