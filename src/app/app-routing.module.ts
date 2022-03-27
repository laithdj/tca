import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AccountComponent } from './account/account.component';
import { BecomepartnerComponent } from './becomepartner/becomepartner.component';
import { CareeradviceComponent } from './careeradvice/careeradvice.component';
import { ConnectComponent } from './connect/connect.component';
import { EnglishComponent } from './english/english.component';
import { EventsComponent } from './events/events.component';
import { ForumComponent } from './forum/forum.component';
import { FoundationComponent } from './foundation/foundation.component';
import { GraduatesComponent } from './graduates/graduates.component';
import { JobSearchComponent } from './job-search/job-search.component';
import { JobvacancyComponent } from './jobvacancy/jobvacancy.component';
import { ListpartnershipComponent } from './listpartnership/listpartnership.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { StripePaymentComponent } from './stripe-payment/stripe-payment.component';
import { StudentApplicationComponent } from './student-application/student-application.component';
import { TutoringComponent } from './tutoring/tutoring.component';
import { UndergraduatesComponent } from './undergraduates/undergraduates.component';
import { AucklanduniComponent } from './universities/aucklanduni/aucklanduni.component';
import { AutComponent } from './universities/aut/aut.component';
import { CanterburyComponent } from './universities/canterbury/canterbury.component';
import { LincolnComponent } from './universities/lincoln/lincoln.component';
import { OtagoComponent } from './universities/otago/otago.component';
import { VictoriaComponent } from './universities/victoria/victoria.component';
import { WaikatoComponent } from './universities/waikato/waikato.component';
import { VisaComponent } from './visa/visa.component';


const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'undergraduates', component: UndergraduatesComponent },
  { path: 'graduates', component: GraduatesComponent },
  { path: 'visa', component: VisaComponent },
  { path: 'tutoring', component: TutoringComponent },
  { path: 'recruitment', component: RecruitmentComponent },
  { path: 'listpartnership', component: ListpartnershipComponent },
  { path: 'jobvacancy', component: JobvacancyComponent },
  { path: 'foundation', component: FoundationComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'events', component: EventsComponent },
  { path: 'job-search', component: JobSearchComponent },
  { path: 'english', component: EnglishComponent },
  { path: 'connect', component: ConnectComponent },
  { path: 'career-advice', component: CareeradviceComponent },
  { path: 'becomepartner', component: BecomepartnerComponent },
  { path: 'account', component: AccountComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'aucklanduni', component: AucklanduniComponent },
  { path: 'aut', component: AutComponent },
  { path: 'canterbury', component: CanterburyComponent },
  { path: 'lincoln', component: LincolnComponent },
  { path: 'massey', component: AboutusComponent },
  { path: 'otago', component: OtagoComponent },
  { path: 'victoria', component: VictoriaComponent },
  { path: 'waikato', component: WaikatoComponent },
  { path: 'student-application', component: StudentApplicationComponent },
  { path: 'stripe-payment', component: StripePaymentComponent },



];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }