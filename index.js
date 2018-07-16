const fs = require("fs");
const Inliner = require("inliner");

module.exports = bundler => {
  bundler.on("bundled", async (bundle) => {
    if (process.env.NODE_ENV !== "production")
      return;

    await new Promise((resolve) => {
      const inliner = new Inliner(bundle.name, function(error, html) {
        if (error) {
          throw error;
        }
        fs.writeFile(bundle.name, html, function(err) {
          if (error) {
            throw error;
          }
          resolve();
        });
      });
    });
  });
};
