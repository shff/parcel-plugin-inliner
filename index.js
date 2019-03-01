const fs = require("fs");
const postHTML = require("posthtml");
const posthtmlInlineAssets = require("posthtml-inline-assets");

module.exports = bundler => {
  bundler.on("bundled", (bundle) => {
    const bundles = Array.from(bundle.childBundles).concat([bundle]);
    return Promise.all(bundles.map(async bundle => {
      if (!bundle.entryAsset || bundle.entryAsset.type !== "html") return;
    
      const cwd = bundle.entryAsset.options.outDir;
      const data = fs.readFileSync(bundle.name);
      const result = await postHTML([posthtmlInlineAssets({ cwd })]).process(data);
      fs.writeFileSync(bundle.name, result.html);
    }));
  });
};
