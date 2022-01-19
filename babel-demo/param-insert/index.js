const { transformFileSync } = require("@babel/core");
const insertParametersPlugin = require("./plugins/insert-params-plugin");
const path = require("path");

const { code } = transformFileSync(path.join(__dirname, "./source-code.js"), {
  plugins: [insertParametersPlugin],
  parserOpts: {
    sourceType: "unambiguous",
    plugins: ["jsx"],
  },
});

console.log(code, map);
