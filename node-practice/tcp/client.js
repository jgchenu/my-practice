const net = require('net');
const client = net.connect({ port: 5201 }, function() {
  console.log('client connected');
  client.write('client data: world!');
});
client.on('data', function(data) {
  console.log(data.toString());
  client.end();
});
client.on('end', function() {
  console.log('client disconnected');
});
