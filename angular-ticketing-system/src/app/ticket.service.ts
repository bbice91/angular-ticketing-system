import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Ticket } from './ticket';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root', })

export class TicketService {

  private ticketsUrl = 'http://localhost:5045/api/Tickets';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET tickets from the server */
  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.ticketsUrl)
      .pipe(
        tap(_ => this.log('fetched tickets')),
        catchError(this.handleError<Ticket[]>('getTickets', []))
      );
  }

  /** GET ticket by id. Return `undefined` when id not found */
  getTicketNo404<Data>(id: number): Observable<Ticket> {
    const url = `${this.ticketsUrl}/?id=${id}`;
    return this.http.get<Ticket[]>(url)
      .pipe(
        map(tickets => tickets[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} ticket id=${id}`);
        }),
        catchError(this.handleError<Ticket>(`getTicket id=${id}`))
      );
  }

  /** GET ticket by id. Will 404 if id not found */
  getTicket(id: number): Observable<Ticket> {
    const url = `${this.ticketsUrl}/${id}`;
    return this.http.get<Ticket>(url).pipe(
      tap(_ => this.log(`fetched ticket id=${id}`)),
      catchError(this.handleError<Ticket>(`getTicket id=${id}`))
    );
  }

  /* GET tickets whose name contains search term */
  searchTickets(term: string): Observable<Ticket[]> {
    if (!term.trim()) {
      // if not search term, return empty ticket array.
      return of([]);
    }
    return this.http.get<Ticket[]>(`${this.ticketsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found tickets matching "${term}"`) :
         this.log(`no tickets matching "${term}"`)),
      catchError(this.handleError<Ticket[]>('searchTickets', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new ticket to the server */
  addTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.ticketsUrl, ticket, this.httpOptions).pipe(
      tap((newTicket: Ticket) => this.log(`added ticket w/ id=${newTicket.id}`)),
      catchError(this.handleError<Ticket>('addTicket'))
    );
  }

  /** DELETE: delete the ticket from the server */
  deleteTicket(id: number): Observable<Ticket> {
    const url = `${this.ticketsUrl}/${id}`;

    return this.http.delete<Ticket>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted ticket id=${id}`)),
      catchError(this.handleError<Ticket>('deleteTicket'))
    );
  }

  /** PUT: update the ticket on the server */
  updateTicket(ticket: Ticket): Observable<any> {
    return this.http.put(this.ticketsUrl, ticket, this.httpOptions).pipe(
      tap(_ => this.log(`updated ticket id=${ticket.id}`)),
      catchError(this.handleError<any>('updateTicket'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a TicketService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TicketService: ${message}`);
  }
}
