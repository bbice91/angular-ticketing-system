import { Component, OnInit } from '@angular/core';

import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    this.ticketService.getTickets()
    .subscribe(tickets => this.tickets = tickets);
  }
}

