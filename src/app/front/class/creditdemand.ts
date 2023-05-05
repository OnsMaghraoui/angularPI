import {User} from "./user";
import {Credit} from "./credit";
import {Amortisation} from "./amortization";
import {Account} from "./account";
import {TypeCd} from "./TypeCd";

export class CreditDemand {
    id_cd?: number;
    sum_cd?: number;
    duration_cd?: number;
    status_cd?: boolean;
    value_cd?: number;
    interestRate?: number;
    credit?: Credit;
    typecd?: TypeCd ;
    account?:Account;
    amortization?: Amortisation;
    user?: User;
}

