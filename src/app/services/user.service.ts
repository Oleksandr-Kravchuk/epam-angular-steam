import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
 }),
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  public getGames(): Observable<any> {
    return this.http.get('/api/games', httpOptions);
  }

  public addGame(gameId: string): Observable<any> {
    return this.http.patch('/api/games/addGame', {
      gameId
    }, httpOptions);
  }

  public findGames(searchParam: string): Observable<any> {
    return this.http.get('/api/games/findGames', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*'
     }),
     params: {
      'searchParam': searchParam
     }
    });
  }

  public getLibrary(): Observable<any> {
    return this.http.get('/api/games/library', httpOptions);
  }

  public getFriends(): Observable<any> {
    return this.http.get('/api/users', httpOptions);
  }

  public getProfile(): Observable<any> {
    return this.http.get('/api/users/me', httpOptions);
  }

  public findFriends(searchParam: string): Observable<any> {
    return this.http.get('/api/users/findUsers', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*'
     }),
     params: {
      'searchParam': searchParam
     }
    });
  }

  public addFriend(friendId: string): Observable<any> {
    return this.http.patch('/api/users/me/addFriend', {
      friendId
    }, httpOptions);
  }

  public removeFriend(friendId: string): Observable<any> {
    return this.http.patch('/api/users/me/removeFriend', {
      friendId
    }, httpOptions);
  }

  public updateProfile(username: string, email: string, age: string): Observable<any> {
    return this.http.patch('/api/users/me', {
      username,
      email,
      age
    }, httpOptions);
  }
}
