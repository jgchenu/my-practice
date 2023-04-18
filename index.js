const qs = require("qs");
console.log(qs.parse("?a=1", { ignoreQueryPrefix: true }));
