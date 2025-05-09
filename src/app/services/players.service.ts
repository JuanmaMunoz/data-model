import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { IPlayer } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private http: HttpClient) {}

  public getPlayers(): Observable<IPlayer[]> {
    const url = 'assets/data/players.json';
    return this.http.get<IPlayer[]>(url).pipe(delay(250));
  }
}
