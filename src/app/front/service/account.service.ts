import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Account} from "../class/account";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:8083/account';
  constructor(private http: HttpClient) { }
  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/all`);
  }
}
