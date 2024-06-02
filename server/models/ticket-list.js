const Ticket = require("./ticket");

class TicketList {
  constructor() {
    this.lastNumber = 0;

    // Move tickets from pending to assigned
    this.pendingTickets = [];
    this.assignedTickets = [];
  }

  // Getter to get next number
  get nextNumber() {
    this.lastNumber++;

    return this.lastNumber;
  }

  // Return last 13 tickets (3 for cards and 10 for history)
  get last13Tickets() {
    return this.assignedTickets.slice(0, 13);
  }

  addTicket() {
    const newTicket = new Ticket(this.nextNumber);
    this.pendingTickets.push(newTicket);
    
    return newTicket;
  }

  assignTicket(name, desktop) {
    if (this.pendingTickets.length === 0) return null;

    const nextTicket = this.pendingTickets.shift();
    nextTicket.name = name;
    nextTicket.desktop = desktop;

    // Add ticket to first position
    this.assignedTickets.unshift(nextTicket);

    return nextTicket;
  }
}

module.exports = TicketList;
