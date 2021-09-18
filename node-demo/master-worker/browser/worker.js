var n = 1;
while (true) {
  n += 1;
  for (var i = 2; i <= Math.sqrt(n); i += 1) if (n % i == 0) continue;
  // found a prime
  postMessage(n);
}
