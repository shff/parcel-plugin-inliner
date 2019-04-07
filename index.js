const fs = require("fs");
const postHTML = require("posthtml");
const posthtmlInlineAssets = require("posthtml-inline-assets");

module.exports = bundler => {
  bundler.on("bundled", (bundle) => {
    const bundles = Array.from(bundle.childBundles).concat([bundle]);
    return Promise.all(bundles.map(async bundle => {
      if (!bundle.entryAsset || bundle.entryAsset.type !== "html") return;

      let config = { cwd: bundle.entryAsset.options.outDir };
      const userConfig = await bundle.entryAsset.getConfig([
        'posthtml.config.js',
        '.posthtmlrc'
      ]);

      if (
        userConfig &&
        userConfig.hasOwnProperty('plugins') &&
        userConfig.plugins.hasOwnProperty('posthtml-inline-assets')
      ) {
        config = Object.assign(
          config,
          userConfig.plugins['posthtml-inline-assets']
        );
      }

      const data = fs.readFileSync(bundle.name);
      const result = await postHTML([
        posthtmlInlineAssets(config)
      ]).process(data);
      fs.writeFileSync(bundle.name, result.html);
    }));
  });
};
