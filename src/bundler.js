const fs = require("fs");
const createGraph = require("./createGraph");
const bundle = require("./bundle");
const treeShake = require("./treeShake");
const { createChunks, generateRuntimeLoader } = require("./codeSplit");
const myPlugin = require("./plugins/myPlugin");
const { getCachedAsset, setCachedAsset } = require("./optimizations/cache");
const runInWorker = require("./optimizations/multiThread");

class Bundler {
  constructor() {
    this.plugins = [];
  }

  use(plugin) {
    this.plugins.push(plugin);
  }

  async bundle(graph) {
    this.plugins.forEach(
      (plugin) => plugin.beforeTransform && plugin.beforeTransform()
    );

    const bundledCode = bundle(graph);

    this.plugins.forEach(
      (plugin) => plugin.afterTransform && plugin.afterTransform(bundledCode)
    );

    this.plugins.forEach(
      (plugin) => plugin.afterBundle && plugin.afterBundle(bundledCode)
    );

    return bundledCode;
  }
}

async function runBundler(entry) {
  const graph = createGraph(entry);
  const chunks = createChunks(graph);

  const bundler = new Bundler();
  bundler.use(myPlugin);

  const bundledCode = await bundler.bundle(graph);
  const treeShakenCode = await treeShake(bundledCode);
  const minifiedCode = await runInWorker("./minify-worker.js", treeShakenCode);

  const runtimeLoader = generateRuntimeLoader(chunks);
  const finalCode = `${runtimeLoader}\n${minifiedCode}`;

  fs.writeFileSync("./dist/bundle.js", finalCode);

  Object.entries(chunks).forEach(([chunkId, mod]) => {
    const chunkCode = bundle([mod]);
    fs.writeFileSync(`./dist/${chunkId}.js`, chunkCode);
  });
}

runBundler("./example/index.js");
