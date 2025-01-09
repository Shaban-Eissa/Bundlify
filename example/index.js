import { add } from "./utils/math.js";
import "./styles.css";
import logo from "./image.png";

console.log("Hello from the bundler!");
console.log("2 + 3 =", add(2, 3));

const img = document.createElement("img");
img.src = logo;
document.body.appendChild(img);

// Dynamic import for code splitting
import("./utils/logger.js").then(({ log }) => {
  log("Lazy-loaded logger module!");
});

