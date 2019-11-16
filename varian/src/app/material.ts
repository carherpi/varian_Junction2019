import {
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule, 
    MatCardModule, MatGridListModule, MatListModule, MatIconModule, MatTabsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule,
    MatPaginatorModule, MatSidenavModule, MatDialogModule, MatStepperModule, 
    MatExpansionModule, MatSliderModule
  } from '@angular/material';
  import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
  import { NgModule } from '@angular/core';
  
  @NgModule({
    imports: [
      MatButtonModule, MatCheckboxModule, MatToolbarModule, 
      BrowserAnimationsModule, MatMenuModule, MatCardModule, 
      MatGridListModule, MatListModule, MatIconModule, MatTabsModule,
      MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule,
      MatPaginatorModule, MatSidenavModule, MatDialogModule, MatStepperModule,
      MatExpansionModule, MatSliderModule
    ],
    exports: [
      MatButtonModule, MatCheckboxModule, MatToolbarModule, 
      BrowserAnimationsModule, MatMenuModule, MatCardModule, 
      MatGridListModule, MatListModule, MatIconModule, MatTabsModule,
      MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule,
      MatPaginatorModule, MatSidenavModule, MatDialogModule, MatStepperModule,
      MatExpansionModule, MatSliderModule
      ],
  })
  export class MaterialModule { }