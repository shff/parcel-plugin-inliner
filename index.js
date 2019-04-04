const fs = require("fs");
const postHTML = require("posthtml");
const posthtmlInlineAssets = require("posthtml-inline-assets");

const transforms = {
  imgSvg: {
    resolve (node) {
      const isImg = node.tag === 'img'
      const path = node.attrs && node.attrs.src
      if (!isImg || !path) {
        return
      }
      return (path.indexOf('.svg') > -1) ? path : null;
    },
    transform (node, data) {
      const mime = 'image/svg+xml';
      node.attrs.src = 'data:' + mime + ';base64,' + data.buffer.toString('base64');
    }
  }
}

module.exports = bundler => {
  bundler.on("bundled", (bundle) => {
    const bundles = Array.from(bundle.childBundles).concat([bundle]);
    return Promise.all(bundles.map(async bundle => {
      if (!bundle.entryAsset || bundle.entryAsset.type !== "html") return;
    
      const cwd = bundle.entryAsset.options.outDir;
      const data = fs.readFileSync(bundle.name);
      const result = await postHTML([posthtmlInlineAssets({ cwd, transforms })]).process(data);
      fs.writeFileSync(bundle.name, result.html);
    }));
  });
};
