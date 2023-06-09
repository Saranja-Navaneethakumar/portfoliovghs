import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PricipalmsgComponent } from './pricipalmsg/pricipalmsg.component';
import { RouterModule, Routes} from '@angular/router';
import { MottovisionmissionComponent } from './mottovisionmission/mottovisionmission.component';
import { HistoryComponent } from './history/history.component';
import { CrestComponent } from './crest/crest.component';
import { HousesComponent } from './houses/houses.component';
import { OlComponent } from './ol/ol.component';
import { AlComponent } from './al/al.component';
import { ResultsComponent } from './results/results.component';
import { IctunionComponent } from './ictunion/ictunion.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LocationComponent } from './location/location.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SchoolviewimgComponent } from './schoolviewimg/schoolviewimg.component';
import { AcheivementimgComponent } from './acheivementimg/acheivementimg.component';
import { EventsComponent } from './events/events.component';
import { SportsimgComponent } from './sportsimg/sportsimg.component';
import { FarewellimgComponent } from './farewellimg/farewellimg.component';
import { GeneraleventimgComponent } from './generaleventimg/generaleventimg.component';
import { HymnComponent } from './hymn/hymn.component';
import { OurprincipalComponent } from './ourprincipal/ourprincipal.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { RegisterComponent } from './register/register.component';


import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PricipalmsgComponent,
    MottovisionmissionComponent,
    HistoryComponent,
    CrestComponent,
    HousesComponent,
    OlComponent,
    AlComponent,
    ResultsComponent,
    IctunionComponent,
    ContactsComponent,
    LocationComponent,
    GalleryComponent,
    SchoolviewimgComponent,
    AcheivementimgComponent,
    EventsComponent,
    SportsimgComponent,
    FarewellimgComponent,
    GeneraleventimgComponent,
    HymnComponent,
    OurprincipalComponent,
    WelcomeComponent,
    SliderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    StudentComponent,
    RegisterComponent,
    AdminComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    
    RouterModule.forRoot([
      {path: 'aboutus/pricipalmessage', component: PricipalmsgComponent},
      {path: 'aboutus/mottovisionmission', component: MottovisionmissionComponent},
      {path: 'aboutus/history', component: HistoryComponent},
      {path: 'aboutus/crest', component: CrestComponent},
      {path: 'aboutus/houses', component: HousesComponent},
      {path: 'acheivement/ol', component: OlComponent},
      {path: 'acheivement/al', component: AlComponent},
      {path: 'acheivement/results', component: ResultsComponent},
      {path: 'unions/ictunion', component: IctunionComponent},
      {path: 'contacts', component: ContactsComponent},
      {path: 'location', component: LocationComponent},
      {path: 'gallery', component: GalleryComponent},
      {path: 'schoolviewimages', component: SchoolviewimgComponent},
      {path: 'acheivementimages', component: AcheivementimgComponent},
      {path: 'eventsimages', component: EventsComponent},
      {path: 'sportsimages', component: SportsimgComponent},
      {path: 'farewellimages', component: FarewellimgComponent},
      {path: 'generaleventimages', component: GeneraleventimgComponent},
      {path: 'aboutus/schoolhymn', component: HymnComponent },
      {path: 'aboutus/ourprincipal', component: OurprincipalComponent },
      {path: 'aboutus/welcome', component: WelcomeComponent},
      {path: 'slider', component: SliderComponent},
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'student', component: StudentComponent},
      {path: 'register', component:RegisterComponent},
      {path: 'admin', component:AdminComponent,
    }
      
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
