const fs = require("fs");
const path = require("path");

function travelSync(dir, callback) {
  fs.readdirSync(dir).forEach(function(file) {
    const pathname = path.join(dir, file);
    if (fs.statSync(pathname).isDirectory()) {
      travelSync(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}

travelSync("./module", function(name) {
  console.log(name);
});
