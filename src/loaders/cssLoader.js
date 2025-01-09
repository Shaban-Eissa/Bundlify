function cssLoader(content) {
  return `
      const style = document.createElement('style');
      style.textContent = ${JSON.stringify(content)};
      document.head.appendChild(style);
    `;
}

module.exports = cssLoader;
