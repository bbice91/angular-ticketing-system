import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../ticket';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TicketService} from '../ticket.service';
import { FavoriteService } from '../favorite.service';
import { Favorite } from '../favorite';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  ticket?: Ticket;
  favorite?: Favorite;
 
  
  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private favoriteService: FavoriteService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getTicket();
  }
  
  getTicket(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const title = String(this.route.snapshot.paramMap.get('title'));
    console.log("the id is " +id);
    console.log("the title is " +title);

    if(id > 0){
    this.ticketService.getTicket(id)
      .subscribe(ticket => this.ticket= ticket);

    }

  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.ticket) {
      this.ticketService.updateTicket(this.ticket)
        .subscribe(() => this.goBack());
    }
  }

  addFavorite(): void {
    if (this.ticket) {
      this.favoriteService.addFavorite(this.ticket)
      .subscribe(ticket => this.favorite = ticket);
  }
  }
}
