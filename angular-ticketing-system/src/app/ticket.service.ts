import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { Ticket } from './ticket';
import { TICKETS } from './mock-tickets';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  getTickets(): Observable<Ticket[]> {
    const tickets = of(TICKETS);
    this.messageService.add('TicketService: fetched tickets!')
    return tickets;
  }

  constructor(private messageService: MessageService) { }
}
