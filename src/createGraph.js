const createAsset = require("./createAsset");
const path = require("path");

const moduleIdMap = new Map(); 

function createGraph(entry) {
  const mainAsset = createAsset(entry);
  const queue = [mainAsset];

  for (const asset of queue) {
    asset.mapping = {};
    const dirname = path.dirname(asset.filename);

    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath);
      let child;
      if (moduleIdMap.has(absolutePath)) {
        child = moduleIdMap.get(absolutePath); 
      } else {
        child = createAsset(absolutePath);
        moduleIdMap.set(absolutePath, child); 
      }
      asset.mapping[relativePath] = child.id;
      queue.push(child);
    });
  }

  return queue;
}

module.exports = createGraph;
