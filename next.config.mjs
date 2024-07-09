/* v8 ignore start */
import stylexPlugin from "@stylexjs/nextjs-plugin";
import babelrc from "./.babelrc.js";

const plugins = babelrc.plugins;
const [_name, options] = plugins.find(
    (plugin) => Array.isArray(plugin) && plugin[0] === "@stylexjs/babel-plugin",
);
const rootDir = options.unstable_moduleResolution.rootDir ?? __dirname;
const aliases = options.aliases ?? undefined;
const useCSSLayers = options.useCSSLayers ?? undefined;

export default stylexPlugin({ rootDir, aliases, useCSSLayers })({
    transpilePackages: ["@stylexjs/open-props"],
});
/* v8 ignore end */
