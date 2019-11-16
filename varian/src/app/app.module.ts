import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { MaterialModule } from './material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { PatientComponent } from './components/dashboard/patient/patient.component';
import { HttpClientModule } from '@angular/common/http';
import { TwoDimensionalImageComponent } from './components/dashboard/patient/two-dimensional-image/two-dimensional-image.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChecklistComponent } from './components/dashboard/checklist/checklist.component';
import { NotesComponent } from './components/dashboard/notes/notes.component';
import { HistogramaComponent } from './components/dashboard/histograma/histograma.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    PatientComponent,
    ChecklistComponent,
    TwoDimensionalImageComponent,
    NotesComponent,
    HistogramaComponent,
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
