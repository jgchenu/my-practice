const net = require('net');
const server = net.createServer(function(socket) {
  socket.on('data', function(data) {
    console.log('client 发送过来的数据', data.toString());
    socket.write('你好呀,我是服务端Sever');
  });
  socket.on('end', function() {
    console.log('接口断开了');
  });
  socket.write('欢迎阅读深入浅出node.js');
});
server.listen(5201, function() {
  console.log('listen at 127.0.0.1:5201');
});
