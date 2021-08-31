import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(user: Object): Observable<any> {
    return this.http.post('/api/auth/register', {
      user
    }, httpOptions);
  }
  
  public login(email: string, password: string): Observable<any> {
    return this.http.post('/api/auth/login', {
      email,
      password
    }, httpOptions);
  }
}
