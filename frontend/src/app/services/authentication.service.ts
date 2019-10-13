import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {User} from '../models/user.model';
import {UsersRolesEnums} from '../models/user-roles.enum';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _cookieService: CookieService
  ) {}

  public get currentUser(): User {
    if (!this._currentUser) {
      const data = sessionStorage.getItem('user');
      this._currentUser = data ? JSON.parse(data) : {name: 'NO USER', isEmpty: true};
    }
    return this._currentUser;
  }

  public get token(): string {
    return sessionStorage.getItem('token');
  }

  @Output() public successLogin: EventEmitter<any> = new EventEmitter();
  @Output() public successLoginOut: EventEmitter<any> = new EventEmitter();

  private _currentUser: User;

  private static getAuthorizationHeader(login: string, password: string) {
    // const bytes = Buffer.from(login + ':' + password, 'utf8');
    return 'Basic ' + login + ':' + password;
  }

  public login(userName: string, password: string): Promise<boolean> {
    const authorization = AuthenticationService.getAuthorizationHeader(userName, password);

    return this.http.post(environment.apiUrl + 'login', null,
      {
        responseType: 'text',
        // headers:headers
        headers: new HttpHeaders().set('Authorization', authorization),
      }).toPromise()
      .then((data: any) => {
        if (data) {
          const dataArr = JSON.parse(data);
          const user = dataArr.user;
          const groups = dataArr.groups;
          sessionStorage.setItem('token', user.token);
          sessionStorage.setItem('user', JSON.stringify(user));
          this._currentUser = user;
          this.successLogin.emit(null);
          return true;
        }
        return false;
      });
  }

  public logout(logoutPath = '/', queryParams = {}): void {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this._cookieService.removeAll();
    this._currentUser = null;
    this.successLoginOut.emit(null);
    this.router.navigate([logoutPath], queryParams);
  }

  public is(role: UsersRolesEnums) {
    const user = this.currentUser;
    return user && user.type === role;
  }
}
