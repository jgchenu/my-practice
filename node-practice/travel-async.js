const fs = require("fs");
const path = require("path");

async function travelAsync(dir, callback) {
  fs.readdir(dir, (err, files) => {
    files.forEach(file => {
      const pathname = path.join(dir, file);
      fs.stat(pathname, (err, stat) => {
        if (stat.isDirectory()) {
          travelAsync(pathname, callback);
        } else {
          callback(pathname);
        }
      });
    });
  });
}
travelAsync("./module", function(name) {
  console.log(name);
});
