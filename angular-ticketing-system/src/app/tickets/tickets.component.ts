import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  ticket: Ticket ={
    id: 1,
    createdBy:'HELLO',
    resolvedBy:'WORLD',
    userName:'HELLO',
    userEmail:'WORLD'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
