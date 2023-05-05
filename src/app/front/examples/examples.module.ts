import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AgmCoreModule } from '@agm/core';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ExamplesComponent } from './examples.component';
import { ProfileConsultantComponent } from './profileConsultant/profileConsultant.component';
import { BookConsultationComponent } from './book-consultation/book-consultation.component';
import { bookConsultationComponent } from './profileConsultant copy/bookConsultation';
import { ClientCreditDemandComponent } from './client-credit-demand/client-credit-demand.component';
import { CreditAfterPageComponent } from './credit-after-page/credit-after-page.component';
import { EventClientComponent } from './event-client/event-client.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_KEY_HERE'
        })
    ],
    declarations: [
        LandingComponent,
        LoginComponent,
        ExamplesComponent,
        ProfileComponent,
        ProfileConsultantComponent,
        BookConsultationComponent,
        bookConsultationComponent,
        ClientCreditDemandComponent,
        CreditAfterPageComponent,
        EventClientComponent
        
    ]
})
export class ExamplesModule { }
