const { build } = require("esbuild");


const { dependencies = {}, peerDependencies = {} } = require('./package.json')

const sharedConfig = {
  entryPoints: ["src/main.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
};
build({
  ...sharedConfig,
  platform: 'node',
  outfile: "dist/main.js",
});
build({
  ...sharedConfig,
  outfile: "dist/main.esm.js",
  platform: 'neutral',
  format: "esm",
});
