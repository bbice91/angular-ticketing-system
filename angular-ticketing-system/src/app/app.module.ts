import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule} from '@angular/common/http';  

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketSearchComponent } from './ticket-search/ticket-search.component';
import { MessagesComponent } from './messages/messages.component';
import { FormsModule } from '@angular/forms';
import { TicketDisplayComponent } from './ticket-display/ticket-display.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent,
    TicketDetailComponent,
    MessagesComponent,
    DashboardComponent,
    TicketSearchComponent,
    TicketDisplayComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
