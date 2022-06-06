import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from './player';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class PlayerService {
  // private apiServerUrl = 'http://localhost:8080';
  private apiServerUrl = 'https://utle.herokuapp.com';
  constructor(private http: HttpClient) { }

  public getPlayers(): Observable<Player[]> {
    return this.http.get<any>(`${this.apiServerUrl}/player/all`);
  }

  public addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(`${this.apiServerUrl}/player/add`, player);
  }

  public updatePlayer(player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiServerUrl}/player/update`, player);
  }

  public deletePlayer(playerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/player/delete/${playerId}`);
  }
}
