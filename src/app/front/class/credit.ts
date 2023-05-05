import {CreditDemand} from "./creditdemand";
import {Amortisation} from "./amortization";
import {Claim} from "./claim";
import {User} from "./user";


export class Credit {
    id_credit: number;
    startdate_credit: Date;
    duedate_credit: Date;
    amount_credit: number;
    remainingamount_credit: number;
    interest_rate: number;
    amortizationTable: Amortisation[];
    creditDemand: CreditDemand;
    claims: Claim[];
    user: User;
}

