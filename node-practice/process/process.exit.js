const process = require('process');

try {
  throw new Error('test exit');
} catch (error) {
  process.exit(1);
}
