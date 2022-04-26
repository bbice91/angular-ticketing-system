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
  
  selectedTicket?: Ticket;

  tickets: Ticket[] = [];

  
  constructor(private ticketService: TicketService, private messageService:MessageService) {}

  ngOnInit(): void {
    this.getTickets();
  }

  onSelect(ticket: Ticket): void {
    this.selectedTicket = ticket;
    this.messageService.add('TicketsComponent: Selected ticket id=${ticket.id}');
  }
  getTickets(): void {
    this.ticketService.getTickets()
      .subscribe(tickets => this.tickets = tickets);
  }


}
