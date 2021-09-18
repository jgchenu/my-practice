function divSelfContentElement(message) {
  var father = document.createElement('div');
  father.className = 'self';
  var child = document.createElement('div');
  child.innerHTML = message;
  father.appendChild(child);
  return father;
}

function divRoomContentElement(message) {
  return $('<div></div>').text(message);
}

function divSystemContentElement(message) {
  return $('<div></div>').html('<i>' + message + '</i>');
}

function divOtherContentElement(message) {
  var father = document.createElement('div');
  father.className = 'other';
  var child = document.createElement('div');
  child.innerHTML = message;
  father.appendChild(child);
  return father;
}

function processUserInput(chatApp, socket) {
  var message = $('#send-message').val();
  var systemMessage;

  if (message.charAt(0) == '/') {
    systemMessage = chatApp.processCommand(message);
    if (systemMessage) {
      $('#messages').append(divSelfContentElement(systemMessage));
    }
  } else {
    chatApp.sendMessage(
      $('#room')
        .text()
        .split(':')[1],
      message
    );
    $('#messages').append(divSelfContentElement(message));
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
  }

  $('#send-message').val('');
}

var socket = io.connect();

$(document).ready(function() {
  var chatApp = new Chat(socket);

  socket.on('nameResult', function(result) {
    var message;

    if (result.success) {
      message = '你的昵称为： ' + result.name + '.';
    } else {
      message = result.message;
    }
    $('#messages').append(divSystemContentElement(message));
  });

  socket.on('joinResult', function(result) {
    $('#room').text('房间名称:' + result.room);
    $('#messages').append(divSystemContentElement('成功加入房间'));
  });

  socket.on('message', function(message) {
    if (message.type === 'join') {
      var newElement = $('<div class="join"></div>').text(message.text);
    } else {
      var newElement = divOtherContentElement(message.text);
    }

    $('#messages').append(newElement);
    const messagesDiv = document.querySelector('#messages');
    const scrollHeight = messagesDiv.scrollHeight;
    const offsetHeight = messagesDiv.offsetHeight;
    // 滚动到底部
    messagesDiv.scrollTop = scrollHeight -offsetHeight; 
  });

  socket.on('rooms', function(rooms) {
    $('#room-list').empty();

    for (var room in rooms) {
      if (room != '') {
        $('#room-list').append(divRoomContentElement(room));
      }
    }

    $('#room-list div').click(function() {
      chatApp.processCommand('/join ' + $(this).text());
      $('#send-message').focus();
    });
  });

  setInterval(function() {
    socket.emit('rooms');
  }, 1000);

  $('#send-message').focus();

  $('#send-form').submit(function() {
    processUserInput(chatApp, socket);
    return false;
  });
});
