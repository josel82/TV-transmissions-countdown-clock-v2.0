import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CounterService } from './services/counter.service';
import { HighlightDirective } from './directives/highlight.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    AutoFocusDirective,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [CounterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
