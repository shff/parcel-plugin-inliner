const fs = require("fs");
const postHTML = require("posthtml");
const posthtmlInlineAssets = require("posthtml-inline-assets");

const run = async bundle => {
  if (bundle.entryAsset.type !== "html") return;

  const cwd = bundle.entryAsset.options.outDir;
  const data = fs.readFileSync(bundle.name);
  const result = await postHTML([posthtmlInlineAssets({ cwd })]).process(data);
  fs.writeFileSync(bundle.name, result.html);
};

module.exports = bundler => {
  bundler.on("bundled", (bundle) => {
    if (process.env.NODE_ENV !== "production" && !process.env.INLINE_ASSETS)
      return;

    if (!bundle.entryAsset)
      return Promise.all(Array.from(bundle.childBundles).map((child) => run(child)));

    return run(bundle);
  });
};
