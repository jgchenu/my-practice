async function main() {
  const resource1 = await import("./chunk1");
  const resource2 = await import("./chunk2");
  const resource = await import("./chunk");
}

main();
