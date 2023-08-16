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
import { FullComponent } from './layout/full/full.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    HeaderComponent
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
  ],
  exports: [TablerIconsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
