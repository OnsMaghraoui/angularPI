import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credit } from '../class/credit';

import {TypeCd} from "../class/TypeCd";

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  private baseUrl = 'http://localhost:8083/credit';

  constructor(private http: HttpClient) { }

  addCredit(credit: Credit, idcd: number): Observable<Credit> {
    return this.http.post<Credit>(`${this.baseUrl}/addcredit/${idcd}`, credit);
  }

  updateCredit(credit: Credit): Observable<Credit> {
    return this.http.put<Credit>(`${this.baseUrl}/update`, credit);
  }

  getCredit(id: number): Observable<Credit> {
    return this.http.get<Credit>(`${this.baseUrl}/get/${id}`);
  }

  getAllCredits(): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.baseUrl}/all`);
  }

  deleteCredit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

/**  calculateRemainingAmount(creditId: number, amountPaid: number, interestRate: number): Observable<number> {
    const url = `${this.baseUrl}/${creditId}/remaining-amount?amountPaid=${amountPaid}&interestRate=${interestRate}`;
    return this.http.get<number>(url);
  }


  calculateMonthlyPayment(value_cd: number, duration_cd: number, typeCd: typeCd): Observable<number> {
    const url = `${this.baseUrl}/monthly-payment?value_cd=${value_cd}&duration_cd=${duration_cd}&typeCd=${typeCd.toString()}`;
    return this.http.get<number>(url);
  }  **/

}
