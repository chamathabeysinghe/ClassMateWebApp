import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {contentHeaders} from "../common/headers";

@Injectable()
export class UserService {

  baseUrl = "http://localhost:3000/api";
  accountType = "null";
  firstName = "null";
  lastName = "null";
  accountLevel="null";
  token = "";

  constructor(private http: Http) {
    console.log('Task service initialized...');
  }

  /**
   * Log the user
   * @param username
   * @param password
   * @param func
   */
  login(username, password, func) {
    event.preventDefault();
    let body = JSON.stringify({email: username, password: password});
    this.http.post(this.baseUrl + '/authenticate', body, {headers: contentHeaders}).map(res=>res.json()).subscribe(
      response=> {
        if (response.success == true) {
          localStorage.removeItem('id_token');
          localStorage.setItem('id_token', response.token);
          localStorage.removeItem('account_type');
          localStorage.setItem('account_type', response.accountType);
          localStorage.removeItem('first_name');
          localStorage.setItem('first_name', response.firstName);
          localStorage.removeItem('last_name');
          localStorage.setItem('last_name', response.lastName);
          localStorage.removeItem('accountLevel');
          localStorage.setItem('accountLevel',response.accountLevel);
          this.accountType = response.accountType;
          this.token = response.token;
          this.firstName = response.firstName;
          this.lastName = response.lastName;
          this.accountLevel=response.accountLevel;
          func(true);
          // window.location.href="/dashboard";
        }
        else {
          console.log("error in authentication");
          func(false);
        }
      },
      error => {
        console.log(error.text());
        func(false);
      }
    );
    // return false;
    // return this.http.post(this.baseUrl+'/authenticate', body, { headers: contentHeaders }).map(res=>res.json());

  }

  /**
   * Sign up the user
   * @param user
   * @returns {Observable<R>}
   */
  signUp(user) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + '/sign-up', JSON.stringify(user), {headers: headers}).map(res=>res.json());

  }

  /**
   * get user account type
   * @returns {string}
   */
  getAccountType() {
    if (this.accountType == "null") {
      this.accountType = localStorage.getItem("account_type");
    }
    return this.accountType;
  }

  getAccountLevel(){

    if (this.accountLevel == "null") {
      this.accountLevel = localStorage.getItem("accountLevel");
    }
    console.log("ACCOUNT LEVEL : "+this.accountLevel);
    return this.accountLevel;
  }

  /**
   * get user first name
   * @returns {string}
   */
  getFirstName() {
    if (this.firstName == "null") {
      this.firstName = localStorage.getItem("first_name");
    }
    return this.firstName;
  }

  /**
   * get user last name
   * @returns {string}
   */
  getLastName() {
    if (this.lastName == "null") {
      this.lastName = localStorage.getItem("last_name");
    }
    return this.lastName;
  }
}
