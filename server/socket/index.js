const { Server } = require('socket.io');

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*', // For production, replace with exact frontend domain
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Join room for a specific branch (e.g. branch_12345)
    socket.on('join_branch', (branchId) => {
      socket.join(`branch_${branchId}`);
      console.log(`Socket ${socket.id} joined branch_${branchId}`);
    });

    // Kitchen specific events
    socket.on('kitchen_order_update', (data) => {
      // data: { branchId, orderId, itemId, status }
      io.to(`branch_${data.branchId}`).emit('order_status_changed', data);
    });

    // Waiter calls
    socket.on('call_waiter', (data) => {
      // data: { branchId, tableId, tableName }
      io.to(`branch_${data.branchId}`).emit('waiter_called', data);
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = initSocket;
