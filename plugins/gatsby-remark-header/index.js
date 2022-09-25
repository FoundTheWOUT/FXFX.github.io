module.exports = async function (options) {
  // Note that `import()` caches, so this should be fast enough.
  await import("./main.mjs").then((module) =>
    module.default.call(this, options)
  );
};
