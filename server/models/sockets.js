const TicketList = require('../models/ticket-list');

class Sockets {
  constructor(io) {
    this.io = io;

    this.ticketList = new TicketList();
  }

  socketsEvents() {
    // Argument socket is like the client connected to the server
    this.io.on('connection', (socket) => {
      console.log('Client connected');

      // SOCKET EVENTS

      // 1. Get new ticket
      socket.on('get-new-ticket', (_, callback) => {
        const newTicket = this.ticketList.addTicket();

        callback(newTicket);
      });

      // 2. Next ticket
      socket.on('next-ticket', (user, callback) => {
        const nextTicket = this.ticketList.assignTicket(user.name, user.desktop);
        callback(nextTicket);

        // When a new ticket is assigned, send the last 13 tickets to update the frontend queue
        this.io.emit('ticket-assigned', this.ticketList.last13Tickets);
      });
    });
  }
}

module.exports = Sockets;
