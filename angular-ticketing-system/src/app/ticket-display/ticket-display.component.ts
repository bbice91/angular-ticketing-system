import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TicketService } from '../ticket.service';
import { TicketsComponent } from '../tickets/tickets.component';
import { ActivatedRoute } from '@angular/router';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
@Component({
  selector: 'app-ticket-display',
  templateUrl: './ticket-display.component.html',
  styleUrls: ['./ticket-display.component.css']
})
export class TicketDisplayComponent implements OnInit {
  ticket? : Ticket
  constructor(private ticketDetailcomponent: TicketDetailComponent,
     private ticketService: TicketService,
     private route: ActivatedRoute,
     ) { }

  ngOnInit(): void {
    this.getTicket();
  }
  getTicket(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const title = String(this.route.snapshot.paramMap.get('title'));
    console.log("the id is " +id);
    console.log("the id is " +id);
    if(id > 0){
    this.ticketService.getTicket(id)
      .subscribe(ticket => this.ticket= ticket);
    }
  }
}
