import { Component, OnInit } from '@angular/core';
import { CreditService} from "../../../front/service/credit.service";
import {IAlert} from "../../../front/components/notification/notification.component";
import {Credit} from "../../../front/class/credit";

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {

  message: string;
  alerts: Array<IAlert> = [];
  credits: Credit[];
  form : boolean = false;

  constructor(private creditService: CreditService) {
  }

  ngOnInit() {
    this.showCredits();
  }
  showCredits():void{
    this.creditService.getAllCredits().subscribe(
        credits => {
          this.credits = credits;
        }
    );
    }

  addCredit(credit: Credit, id_credit: number){
    this.creditService.addCredit(credit ,id_credit).subscribe(() => {
      this.showCredits();
      this.form = false;
    });
  }
  deleteCredit(id_credit:number) {
    if (confirm('Are you sure you want to delete this credit?')) {
      this.creditService.deleteCredit(id_credit).subscribe(
          Response => {
            // Show success message
            this.alerts.push({
              id: 2,
              type: 'success',
              strong: 'Success!',
              message: 'Credit deleted successfully.',
              icon: 'ui-2_like'
            });
            window.location.reload();
          }
      );
    } else {
      this.alerts.push({
        id: 3,
        type: 'warning',
        strong: 'Cancelled!',
        message: 'Credit deletion cancelled.',
        icon: 'ui-1_bell-53'
      });
    }
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
