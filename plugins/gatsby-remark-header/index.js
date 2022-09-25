module.exports = function (options) {
  // Note that `import()` caches, so this should be fast enough.
  import("./main.mjs").then((module) => module.default.call(this, options));
};
