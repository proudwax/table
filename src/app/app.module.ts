import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { TableWrapperModule } from './components/table-wrapper/table-wrapper.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, TableWrapperModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
