const { Worker } = require("worker_threads");
const path = require("path");

function runInWorker(workerFile, data) {
  return new Promise((resolve, reject) => {
    const workerPath = path.resolve(__dirname, "../", workerFile);
    const worker = new Worker(workerPath, { workerData: data });

    worker.on("message", (message) => {
      if (message.error) {
        reject(new Error(message.error));
      } else {
        resolve(message);
      }
    });

    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

module.exports = runInWorker;
