const { parentPort, workerData } = require("worker_threads");
const { minify } = require("terser");

(async () => {
  try {
    const result = await minify(workerData, {
      compress: true,
      mangle: true,
    });
    parentPort.postMessage(result.code);
  } catch (error) {
    parentPort.postMessage({ error: error.message });
  }
})();
