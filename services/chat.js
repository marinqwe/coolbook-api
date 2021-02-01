module.exports = function useChat(server, usersOnline) {
  //CORS options to allow socket connection
  const options = {
    cors: true,
    origins: [process.env.FRONTEND_URL],
  };
  const io = require('socket.io')(server, options);

  io.on('connection', (socket) => {
    const { user, id } = socket.handshake.query;
    console.log('CONNECTED: ', user);
    //save connected users
    if (!usersOnline.has(id)) {
      usersOnline.set(id, { user, socketId: socket.id, room: null });
    }
    //can't emit Maps so convert to array
    //io.emit('usersOnline', JSON.stringify(Array.from(usersOnline)));

    socket.on('joinRoom', ({ room }) => {
      console.log('USER JOINED: ', user, room);
      const onlineUser = usersOnline.get(id);
      usersOnline.set(id, { ...onlineUser, room });
      socket.join(room);
      socket.broadcast.to(room).emit('newMessage', {
        id: null,
        username: 'ChatBot',
        message: `${user} connected.`,
        timestamp: formatDate(Date.now()),
      });
    });

    socket.on('leaveRoom', () => {
      const onlineUser = usersOnline.get(id);
      if (onlineUser) {
        socket.broadcast.to(onlineUser.room).emit('newMessage', {
          id: null,
          username: 'ChatBot',
          message: `${onlineUser.user} disconnected.`,
          timestamp: formatDate(Date.now()),
        });
        usersOnline.set(id, { ...onlineUser, room: null });
        console.log('USER LEFT: ', onlineUser);
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

    // socket.on(
    //   'privateChatMsg',
    //   ({ id, username, message, timestamp, partnerId }) => {
    //     console.log('MSG', message, id, partnerId);
    //     io.to(partnerId).emit('privateChatMsg', {
    //       id,
    //       username,
    //       message,
    //       timestamp: formatDate(Date.now()),
    //     });
    //   }
    // );

    socket.on('disconnect', () => {
      const userOnline = usersOnline.has(id);
      if (userOnline) {
        usersOnline.delete(id);
      }
      console.log('CLIENT DISCONNECTED');
    });
  });
};

function formatDate(dateToFormat) {
  const date = new Date(dateToFormat);
  return `${date.toLocaleDateString('en-GB')} at ${date.toLocaleTimeString()}`;
}
