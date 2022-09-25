// wrap remark plugin
module.exports = function (options) {
  return async (...args) => {
    const mod = await import("./main.mjs");
    const plugin = mod.default(options);
    return plugin(...args);
  };
};
