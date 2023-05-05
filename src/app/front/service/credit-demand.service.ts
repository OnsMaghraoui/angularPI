import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CreditDemand} from "../class/creditdemand";
import {Observable} from "rxjs";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreditDemandService {



  private baseUrl = 'http://localhost:8081/gnb/creditDemand';

  constructor(private http: HttpClient) {}



  retrieveAllcreditDemands(): Observable<CreditDemand[]> {
    return this.http.get<CreditDemand[]>(`${this.baseUrl}/all`);
  }

  addCreditDemand(creditDemand: CreditDemand, userId: number): Observable<CreditDemand> {
    const url = `${this.baseUrl}/add/${userId}`;
    return this.http.post<CreditDemand>(url, creditDemand);
  }


  removecreditDemand(id_cd: number): Observable<void> {
    const url = `${this.baseUrl}/delete/${id_cd}`;
    return this.http.delete<void>(url);
  }


  calculateMonthlyPayment(value_cd: number, duration_cd: number, type_cd: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/monthly-payment?value_cd=${value_cd}&duration_cd=${duration_cd}&typeCd=${type_cd}`);
  }

  calculateDuration(value_cd: number, sum_cd: number, type_cd: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/duration?value_cd=${value_cd}&sum_cd=${sum_cd}&typeCd=${type_cd}`);
  }


  updateCreditDemandStatus(id: number, creditDemand: CreditDemand): Observable<any> {
    const url = `http://localhost:8081/gnb/creditDemand/${id}`;
    return this.http.put(url, creditDemand);
  }

  // method to approve a credit demand
  approveCreditDemand(id: number, creditDemand: CreditDemand): Observable<any> {
    creditDemand.status_cd = true; // set the status to approved
    const url = `http://localhost:8081/gnb/creditDemand/${id}`;
    return this.http.put(url, creditDemand);
  }

// method to disapprove a credit demand
  disapproveCreditDemand(id: number, creditDemand: CreditDemand): Observable<any> {
    creditDemand.status_cd = false; // set the status to disapproved
    const url = `http://localhost:8081/gnb/creditDemand/${id}`;
    return this.http.put(url, creditDemand);
  }




}
