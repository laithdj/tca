import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { GraduatesComponent } from './graduates/graduates.component';
import { VisaComponent } from './visa/visa.component';
import { EnglishComponent } from './english/english.component';
import { FoundationComponent } from './foundation/foundation.component';
import { TutoringComponent } from './tutoring/tutoring.component';
import { EventsComponent } from './events/events.component';
import { JobvacancyComponent } from './jobvacancy/jobvacancy.component';
import { CareeradviceComponent } from './careeradvice/careeradvice.component';
import { ConnectComponent } from './connect/connect.component';
import { ForumComponent } from './forum/forum.component';
import { BecomepartnerComponent } from './becomepartner/becomepartner.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { ListpartnershipComponent } from './listpartnership/listpartnership.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AccountComponent } from './account/account.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { UndergraduatesComponent } from './undergraduates/undergraduates.component';
import { AucklanduniComponent } from './universities/aucklanduni/aucklanduni.component';
import { AutComponent } from './universities/aut/aut.component';
import { CanterburyComponent } from './universities/canterbury/canterbury.component';
import { LincolnComponent } from './universities/lincoln/lincoln.component';
import { MasseyComponent } from './universities/massey/massey.component';
import { OtagoComponent } from './universities/otago/otago.component';
import { VictoriaComponent } from './universities/victoria/victoria.component';
import { WaikatoComponent } from './universities/waikato/waikato.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JobSearchComponent } from './job-search/job-search.component';
import { StudentApplicationComponent } from './student-application/student-application.component';
import { SharedModule } from './shared/shared/shared.module';
import { JobCardComponent } from './job-search/job-cards/job-card/job-card.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './interceptors';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GraduatesComponent,
    VisaComponent,
    EnglishComponent,
    FoundationComponent,
    TutoringComponent,
    EventsComponent,
    JobvacancyComponent,
    CareeradviceComponent,
    ConnectComponent,
    ForumComponent,
    BecomepartnerComponent,
    RecruitmentComponent,
    ListpartnershipComponent,
    AboutusComponent,
    AccountComponent,
    NavComponent,
    FooterComponent,
    UndergraduatesComponent,
    AucklanduniComponent,
    AutComponent,
    CanterburyComponent,
    LincolnComponent,
    MasseyComponent,
    OtagoComponent,
    VictoriaComponent,
    WaikatoComponent,
    JobSearchComponent,
    StudentApplicationComponent,
    JobCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    DialogModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {
        timeOut: 10000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }
    ),
    AuthModule.forRoot({
      ...env.auth,
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
