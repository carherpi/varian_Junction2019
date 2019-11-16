import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { Viewer3dComponent } from './components/viewer3d/viewer3d.component';

import { MaterialModule } from './material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { PatientComponent } from './components/dashboard/patient/patient.component';
import { HttpClientModule } from '@angular/common/http';
import { TwoDimensionalImageComponent } from './components/dashboard/patient/two-dimensional-image/two-dimensional-image.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Viewer3dComponent,
    DashboardComponent,
    NavbarComponent,
    PatientComponent,
    TwoDimensionalImageComponent,
  ],
  imports: [
    
    AppRoutingModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
