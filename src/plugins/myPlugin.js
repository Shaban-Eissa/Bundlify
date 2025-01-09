module.exports = {
  beforeTransform() {
    console.log("Before transform");
  },
  afterTransform(code) {
    console.log("After transform:", code.length);
  },
  afterBundle(code) {
    console.log("After bundle:", code.length);
  },
};
