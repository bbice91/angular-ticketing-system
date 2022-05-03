import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Favorite } from './favorite';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root', })

export class FavoriteService {

  private favoritesUrl = 'http://localhost:5045/api/Favorites';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET favorites from the server */
  getFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(this.favoritesUrl)
      .pipe(
        tap(_ => this.log('fetched favorites')),
        catchError(this.handleError<Favorite[]>('getFavorites', []))
      );
  }

  /** GET favorite by id. Return `undefined` when id not found */
  getFavoriteNo404<Data>(id: number): Observable<Favorite> {
    const url = `${this.favoritesUrl}/?id=${id}`;
    return this.http.get<Favorite[]>(url)
      .pipe(
        map(favorites => favorites[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} favorite id=${id}`);
        }),
        catchError(this.handleError<Favorite>(`getFavorite id=${id}`))
      );
  }

  /** GET favorite by id. Will 404 if id not found */
  getFavorite(id: number): Observable<Favorite> {
    const url = `${this.favoritesUrl}/${id}`;
    return this.http.get<Favorite>(url).pipe(
      tap(_ => this.log(`fetched favorite id=${id}`)),
      catchError(this.handleError<Favorite>(`getFavorite id=${id}`))
    );
  }

  /* GET favorites whose name contains search term */
  searchFavorites(term: string): Observable<Favorite[]> {
    if (!term.trim()) {
      // if not search term, return empty favorite array.
      return of([]);
    }
    return this.http.get<Favorite[]>(`${this.favoritesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found favorites matching "${term}"`) :
         this.log(`no favorites matching "${term}"`)),
      catchError(this.handleError<Favorite[]>('searchFavorites', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new favorite to the server */
  addFavorite(favorite: Favorite): Observable<Favorite> {
    return this.http.post<Favorite>(this.favoritesUrl, favorite, this.httpOptions).pipe(
      tap((newFavorite: Favorite) => this.log(`added favorite w/ id=${newFavorite.id}`)),
      catchError(this.handleError<Favorite>('addFavorite'))
    );
  }

  /** DELETE: delete the favorite from the server */
  deleteFavorite(id: number): Observable<Favorite> {
    const url = `${this.favoritesUrl}/${id}`;

    return this.http.delete<Favorite>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted favorite id=${id}`)),
      catchError(this.handleError<Favorite>('deleteFavorite'))
    );
  }

  /** PUT: update the favorite on the server */
  updateFavorite(favorite: Favorite): Observable<any> {
    return this.http.put(this.favoritesUrl, favorite, this.httpOptions).pipe(
      tap(_ => this.log(`updated favorite id=${favorite.id}`)),
      catchError(this.handleError<any>('updateFavorite'))
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

  /** Log a FavoriteService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`FavoriteService: ${message}`);
  }
}
