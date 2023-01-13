const presets = [];
const plugins = [];

if (process.env["NODE_ENV"] === "test" || process.env["CI"] === "true") {
  // presets
  presets.push("@babel/preset-env");
  presets.push("@babel/preset-typescript");
  presets.push(["@babel/preset-react", { runtime: "automatic" }]);
  presets.push("@emotion/babel-preset-css-prop");

  // plugins
  plugins.push("@babel/plugin-transform-runtime");
}

module.exports = { presets, plugins };
