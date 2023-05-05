import { Component, OnInit } from '@angular/core';
import {CreditDemandService} from "../../../front/service/credit-demand.service";
import {CreditDemand} from "../../../front/class/creditdemand";
import {IAlert} from "../../../front/components/notification/notification.component";
import {Router} from "@angular/router";
import * as Rellax from "rellax";
import {Observable} from "rxjs";

@Component({
  selector: 'app-credit-demand',
  templateUrl: './credit-demand.component.html',
  styleUrls: ['./credit-demand.component.css']
})



export class CreditDemandComponent implements OnInit {


  alerts: Array<IAlert> = [];

  creditDemands: CreditDemand[];


  constructor(private creditDemandService: CreditDemandService) { }

  ngOnInit(): void {

    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('app-consultation');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    this.showCreditDemands();
  }

  showCreditDemands():void{
    this.creditDemandService.retrieveAllcreditDemands().subscribe(
        creditDemands => {
          this.creditDemands = creditDemands;
        }
    );
  }


  deleteCreditDemand(id: number): void {
    this.creditDemandService.removecreditDemand(id)
        .subscribe(() => this.creditDemands = this.creditDemands.filter(cd => cd.id_cd !== id));
  }




  updateCreditDemandStatus(id_cd: number, creditDemand: CreditDemand, status: boolean): Observable<any> {
    creditDemand.status_cd = status;
    return this.creditDemandService.updateCreditDemandStatus(id_cd, creditDemand);
  }


  approveCreditDemand(id: number, creditDemand: CreditDemand): void {
    creditDemand.status_cd = true;
    this.creditDemandService.updateCreditDemandStatus(id, creditDemand)
        .subscribe(() => this.showCreditDemands());
  }

  disapproveCreditDemand(id: number, creditDemand: CreditDemand): void {
    creditDemand.status_cd = false;
    this.creditDemandService.updateCreditDemandStatus(id, creditDemand)
        .subscribe(() => this.showCreditDemands());
  }

  closeAlert(alert: any) {
    setTimeout(() => {
      const index: number = this.alerts.indexOf(alert);
      if (index !== -1) {
        this.alerts.splice(index, 1);
      }
    }, alert.visibleTime);
  }

}
