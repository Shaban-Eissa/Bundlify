# Bundlify 🚀

![State_of_the_Web_Bundlers](https://github.com/user-attachments/assets/686933ed-ed12-4f54-92e7-846d04ab82f9)

A minimal JavaScript bundler that supports static and dynamic imports, code splitting. Inspired by modern bundlers like Webpack, Rollup, and Vite, Bundlify is built from scratch for educational purposes.

## Features

- **Static Imports**: Supports `import` statements for JavaScript modules.
- **Dynamic Imports**: Supports dynamic `import()` for lazy loading modules.
- **Code Splitting**: Automatically creates separate chunk files for dynamically imported modules.
- **CSS and Image Support**: Handles `.css` and image files (`.png`, `.jpg`) using custom loaders.
- **Tree Shaking**: Removes unused code from the final bundle.
- **Minification**: Minifies the output bundle using Terser.



## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shaban-Eissa/Bundlify.git
   cd Bundlify
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the Project
   ```bash
   node src/bundler.js
   ```



## How It Works
- Dependency Graph: Bundlify starts by parsing the entry file (index.js) and recursively builds a dependency graph of all imported modules.

- Code Splitting: Dynamic imports (import()) are detected, and separate chunk files are created for dynamically imported modules.

- Bundling: The dependency graph is converted into a single bundled file (bundle.js) using a custom runtime loader.

- CSS Loader (cssLoader.js): Handles .css files by injecting the CSS into the DOM using a ```<style>``` tag.

- File Loader (fileLoader.js): Handles image files (.png, .jpg) by copying them to the ```/dist``` directory and returning the correct path.

- Plugins: Bundlify supports plugins for extending its functionality. An example plugin (myPlugin.js) is included, which logs messages during the build process.


## Contributing
Contributions are welcome! If you find a bug or want to add a feature, please open an issue or submit a pull request.

## Acknowledgments
Inspired by Webpack, Rollup, and Vite.
