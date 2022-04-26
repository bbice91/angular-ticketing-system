import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket';
import { TICKETS } from '../mock-tickets';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets = TICKETS;
  constructor() { }

  ngOnInit(): void {
  }

}
