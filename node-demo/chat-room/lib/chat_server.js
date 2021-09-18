var socketio = require('socket.io');
var chalk = require('chalk');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function(server) {
  io = socketio.listen(server);
  console.log(chalk.blue('log level: 1'));
  io.sockets.on('connection', function(socket) {
    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
    joinRoom(socket, 'Lobby');
    handleMessageBroadcasting(socket, nickNames);
    handleNameChangeAttempts(socket, nickNames, namesUsed);
    handleRoomJoining(socket);
    socket.on('rooms', function() {
      socket.emit('rooms', io.sockets.adapter.rooms);
    });
    handleClientDisconnection(socket, nickNames, namesUsed);
  });
};

function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
  var name = 'Guest' + guestNumber;
  nickNames[socket.id] = name;
  socket.emit('nameResult', {
    success: true,
    name: name
  });
  namesUsed.push(name);
  return guestNumber + 1;
}

function joinRoom(socket, room) {
  socket.join(room);
  currentRoom[socket.id] = room;
  socket.emit('joinResult', { room: room });
  socket.broadcast.to(room).emit('message', {
    text: nickNames[socket.id] + ' 加入了 ' + room + '.',
    type:'join'
  });

  var usersInRoom = io.sockets.adapter.rooms[room];
  console.log(usersInRoom);
  if (!usersInRoom) return;
  if (usersInRoom.length > 1) {
    var usersInRoomSummary = '现在房间有 ' + room + ': ';
    for (var key in usersInRoom.sockets) {
      var userSocketId = key;
      if (userSocketId != socket.id) {
        usersInRoomSummary += nickNames[userSocketId];
        usersInRoomSummary += ', ';
      }
    }
    usersInRoomSummary += '.';
    socket.emit('message', { text: usersInRoomSummary,type:'join' });
  }
}

function handleNameChangeAttempts(socket, nickNames, namesUsed) {
  socket.on('nameAttempt', function(name) {
    if (name.indexOf('Guest') == 0) {
      socket.emit('nameResult', {
        success: false,
        message: '昵称不能以 "Guest".开头'
      });
    } else {
      if (namesUsed.indexOf(name) == -1) {
        var previousName = nickNames[socket.id];
        var previousNameIndex = namesUsed.indexOf(previousName);
        namesUsed.push(name);
        nickNames[socket.id] = name;
        delete namesUsed[previousNameIndex];
        socket.emit('nameResult', {
          success: true,
          name: name
        });
        socket.broadcast.to(currentRoom[socket.id]).emit('message', {
          text: previousName + ' 现在的昵称为 ' + name + '.'
        });
      } else {
        socket.emit('nameResult', {
          success: false,
          message: '昵称已经被占用了'
        });
      }
    }
  });
}

function handleMessageBroadcasting(socket) {
  socket.on('message', function(message) {
    console.log(message);
    socket.broadcast.to(message.room).emit('message', {
      text: nickNames[socket.id] + ': ' + message.text
    });
  });
}

function handleRoomJoining(socket) {
  socket.on('join', function(room) {
    socket.leave(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom);
  });
}

function handleClientDisconnection(socket) {
  socket.on('disconnect', function() {
    var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
    delete namesUsed[nameIndex];
    delete nickNames[socket.id];
  });
}
