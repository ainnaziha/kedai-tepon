import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BodyComponent } from './layout/body/body.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MainHeaderComponent } from './layout/main-header/main-header.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HeaderComponent,
    MainHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirestoreModule,
    AngularFireModule,
  ],
  exports: [TablerIconsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
