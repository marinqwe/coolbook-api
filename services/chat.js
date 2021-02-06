module.exports = function useChat(server, usersOnline) {
  //CORS options to allow socket connection
  const options = {
    cors: true,
    origins: [process.env.FRONTEND_URL],
  };
  const io = require('socket.io')(server, options);

  // update room users when someone joins/leaves
  function getRoomUsers(users, room) {
    let roomUsers = [];
    users.forEach((userObj) => {
      if (userObj.room === room) {
        roomUsers.push(userObj);
      }
    });
    return io.to(room).emit('roomUsers', {
      users: roomUsers,
    });
  }

  io.on('connection', (socket) => {
    const { user, id } = socket.handshake.query;
    //save connected users
    if (!usersOnline.has(id)) {
      usersOnline.set(id, { user, socketId: socket.id, room: null });
    }

    socket.on('joinRoom', ({ room }) => {
      const onlineUser = usersOnline.get(id);
      usersOnline.set(id, { ...onlineUser, room });
      socket.join(room);
      socket.broadcast.to(room).emit('newMessage', {
        id: null,
        username: 'ChatBot',
        message: `${user} connected.`,
        timestamp: formatDate(Date.now()),
      });

      getRoomUsers(usersOnline, room);
    });

    socket.on('leaveRoom', () => {
      const onlineUser = usersOnline.get(id);
      if (onlineUser) {
        const room = onlineUser.room;

        socket.broadcast.to(room).emit('newMessage', {
          id: null,
          username: 'ChatBot',
          message: `${onlineUser.user} disconnected.`,
          timestamp: formatDate(Date.now()),
        });
        usersOnline.set(id, { ...onlineUser, room: null });

        getRoomUsers(usersOnline, room);
      }
    });

    socket.on('message', ({ id, username, message, room }) => {
      io.to(room).emit('newMessage', {
        id,
        username,
        message,
        timestamp: formatDate(Date.now()),
      });
    });

    socket.on('disconnect', () => {
      const onlineUser = usersOnline.get(id);

      if (onlineUser) {
        if (onlineUser.room) {
          socket.broadcast.to(onlineUser.room).emit('newMessage', {
            id: null,
            username: 'ChatBot',
            message: `${onlineUser.user} disconnected.`,
            timestamp: formatDate(Date.now()),
          });

          getRoomUsers(usersOnline, onlineUser.room);
        }
        usersOnline.delete(id);
      }
    });
  });
};

function formatDate(dateToFormat) {
  const date = new Date(dateToFormat);
  return `${date.toLocaleDateString('en-GB')} at ${date.toLocaleTimeString()}`;
}
