const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    // Http server
    this.server = http.createServer(this.app);

    // Socket config
    this.io = socketIo(this.server);

    // Init Sockets
    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    
    // CORS
    this.app.use(cors());

    // REST API
    // 1. Get last tickets
    this.app.get('/last13-tickets', (_, res) => {
      res.json({
        ok: true,
        tickets: this.sockets.ticketList.last13Tickets
      })
    });
  }

  execute () {
    // Init middlewares
    this.middlewares();

    // Sockets events
    this.sockets.socketsEvents();

    // Init server
    this.server.listen(this.port, () => {
      console.log('Server listening on port: ' + this.port);
    });
  }
}

module.exports = Server;
