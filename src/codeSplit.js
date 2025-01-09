function createChunks(graph) {
  const chunks = {};
  graph.forEach((mod) => {
    if (mod.code.includes("Promise.resolve().then")) {
      const chunkId = mod.id + "_chunk";
      chunks[chunkId] = mod;
    }
  });
  return chunks;
}

function generateRuntimeLoader(chunks) {
  return `
    function loadChunk(chunkId) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = chunkId + '.js';
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.head.appendChild(script);
      });
    }

    window.require = function(chunkId) {
      return loadChunk(chunkId).then(() => require(chunkId));
    };
  `;
}

module.exports = { createChunks, generateRuntimeLoader };
