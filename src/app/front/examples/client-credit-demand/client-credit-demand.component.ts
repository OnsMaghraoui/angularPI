import { Component, OnInit } from '@angular/core';
import {IAlert} from "../../components/notification/notification.component";
import {CreditDemandService} from "../../service/credit-demand.service";
import * as Rellax from "rellax";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {CreditDemand} from "../../class/creditdemand";
import {TypeCd} from "../../class/TypeCd";
import { ActivatedRoute } from '@angular/router';
import {Account} from "../../class/account";
import {AccountService} from "../../service/account.service";
import {BehaviorSubject, Observable} from "rxjs";


@Component({
  selector: 'app-client-credit-demand',
  templateUrl: './client-credit-demand.component.html',
  styleUrls: ['./client-credit-demand.component.css']
})
export class ClientCreditDemandComponent implements OnInit {

  styles: any[] = [{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
  }, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
  }, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
  }, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
  }, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
  }, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{"color": "#dedede"}, {"lightness": 21}]
  }, {
    "elementType": "labels.text.stroke",
    "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
  }, {
    "elementType": "labels.text.fill",
    "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
  }, {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]
  }, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#fefefe"}, {"lightness": 20}]
  }, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]
  }]
  focus: any;

  alerts: Array<IAlert> = [];
  TypeCd = TypeCd; // added to make the enum accessible in the HTML template

  creditDemand: CreditDemand = {};

  monthlyPayment$: Observable<number>;
  duration$: Observable<number>;

  creditDemandForm: FormGroup;

  //creditDemand = { value_cd: 0, sum_cd: 0, duration_cd: 0 };
  sum = new BehaviorSubject<number>(0);
  duration = new BehaviorSubject<number>(0);
  currentUser = { id: 1 }; // TODO: Replace with the actual user ID


  constructor(private formBuilder: FormBuilder,
              private creditDemandService: CreditDemandService) {
    this.creditDemandForm = this.formBuilder.group({
       sum_cd: ['', Validators.required],
      duration_cd: ['', Validators.required],
      value_cd: ['', Validators.required],
      interestRate: ['', Validators.required],
      typecd: ['', Validators.required]
    });

    this.sum.subscribe((val) => {
      this.creditDemand.sum_cd = val;
      this.calculateDuration();
    });
    this.duration.subscribe((val) => {
      this.creditDemand.duration_cd = val;
      this.calculateMonthlyPayment();
    });
  }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  createCreditDemand(): void {

    const creditDemand: CreditDemand = {
      sum_cd: this.creditDemandForm.value.sum_cd,
      duration_cd: this.creditDemandForm.value.duration_cd,
      value_cd: this.creditDemandForm.value.value_cd,
      interestRate: this.creditDemandForm.value.interestRate,
      typecd: this.creditDemandForm.value.typecd


    };

    this.creditDemandService.addCreditDemand(this.creditDemand, this.currentUser.id)
        .subscribe(
            data => {
              console.log(data);
              // TODO: Notify the user that the credit demand was created
            },
            error => {
              console.error(error);
              // TODO: Notify the user that an error occurred
            }
        );

  }


 /** onSumChange() {
    this.sum.next(this.creditDemand.sum_cd);
  }

  onDurationChange() {
    this.duration.next(this.creditDemand.duration_cd);
  }

**/



    calculateDuration() {
      const duration = Math.round(this.creditDemand.sum_cd / this.creditDemand.duration_cd);
      this.duration.next(duration);
    }


  calculateMonthlyPayment() {
    const interestRate = this.creditDemand.interestRate / 12;
    const n = this.creditDemand.duration_cd ;
    const numerator = this.creditDemand.value_cd * interestRate;
    const denominator = 1 - Math.pow(1 + interestRate, -n);
    const monthlyPayment = numerator / denominator;
    this.sum.next(monthlyPayment);
  }







   onDurationChange(): void {
    if (this.creditDemand.value_cd && this.creditDemand.duration_cd) {
      this.monthlyPayment$ = this.creditDemandService.calculateMonthlyPayment(this.creditDemand.value_cd, this.creditDemand.duration_cd, this.creditDemand.typecd);
    }
  }

  onSumChange(): void {
    if (this.creditDemand.value_cd && this.creditDemand.sum_cd) {
      this.duration$ = this.creditDemandService.calculateDuration(this.creditDemand.value_cd, this.creditDemand.sum_cd,  this.creditDemand.typecd);
    }
  }

  closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
