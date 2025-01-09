const cache = new Map();

function getCachedAsset(filename) {
  return cache.get(filename);
}

function setCachedAsset(filename, asset) {
  cache.set(filename, asset);
}

module.exports = { getCachedAsset, setCachedAsset };
