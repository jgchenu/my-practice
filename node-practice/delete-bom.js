function readText(pathname) {
  var bin = fs.readFileSync(pathname);
  if (bin[0] === 0xef && bin[1] === 0xbb && bin[2] === 0xbf) {
    bin = bin.slice(3);
  }
  return bin.toString("utf-8");
}
