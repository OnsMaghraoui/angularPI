import {createComponent, NgModule} from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './front/components/components.component';
import { LandingComponent } from './front/examples/landing/landing.component';
import { LoginComponent } from './front/examples/login/login.component';
import { ProfileComponent } from './front/examples/profile/profile.component';
import { NucleoiconsComponent } from './front/components/nucleoicons/nucleoicons.component';
import { ConsultationComponent } from './back/component/consultation/consultation.component';
import {ProfileConsultantComponent} from './front/examples/profileConsultant/profileConsultant.component'
import { BookConsultationComponent } from './front/examples/book-consultation/book-consultation.component';
import { bookConsultationComponent } from './front/examples/profileConsultant copy/bookConsultation';
import { DashboardComponent } from './back/dashboard/dashboard.component';
import { FullComponent } from './back/layouts/full/full.component';
import { CreditComponent } from './back/component/credit/credit.component';
import {ClientCreditDemandComponent} from "./front/examples/client-credit-demand/client-credit-demand.component";
import {CreditDemandService} from "./front/service/credit-demand.service";
import {CreditDemandComponent} from "./back/component/credit-demand/credit-demand.component";
import {EventComponent} from "./back/component/event/event.component";
import {ButtonsComponent} from "./back/component/buttons/buttons.component";
import {EventClientComponent} from "./front/examples/event-client/event-client.component";

const routes: Routes =[
    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'examples/login',       component: LoginComponent },
    { path: 'examples/profile',     component: ProfileComponent },
    { path: 'consultation',         component: ConsultationComponent},
    { path: 'examples/profileConsultant',component: ProfileConsultantComponent},
    { path: 'examples/bookConsultation',component: BookConsultationComponent},
    { path: 'examples/book',component: bookConsultationComponent},
    { path: 'credit',component:CreditComponent},
    { path: 'examples/client-credit-demand',component: ClientCreditDemandComponent},
    { path: 'creditDemand',component:CreditDemandComponent},
    { path: 'event',component:EventComponent},
    { path: 'ButtonsComponent',component:ButtonsComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'FullComponent', component : FullComponent},
    {path: 'EventClientComponent', component : EventClientComponent},





    {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/examples/landing', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./back/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./back/component/component.module').then((m: { ComponentsModule: any; }) => m.ComponentsModule)
      }
    ]
  }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
