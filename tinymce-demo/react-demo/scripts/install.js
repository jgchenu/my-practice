const fse = require("fs-extra");
const path = require("path");
const topDir = path.resolve(__dirname, "..");
fse.emptyDirSync(path.join(topDir, "static", "tinymce"));
fse.copySync(
  path.join(topDir, "node_modules", "tinymce"),
  path.join(topDir, "static", "tinymce"),
  { overwrite: true }
);
