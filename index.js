const fs = require("fs");
const Inliner = require("inliner");

module.exports = bundler => {
  bundler.on("bundled", (bundle) => {
    if (process.env.NODE_ENV !== "production")
      return;

    return new Promise((resolve, reject) => {
      const inliner = new Inliner(bundle.name, function(error, html) {
        if (error) {
          reject(error);
        }
        fs.writeFile(bundle.name, html, function(err) {
          if (error) {
            reject(error);
          }
          resolve();
        });
      });
    });
  });
};
