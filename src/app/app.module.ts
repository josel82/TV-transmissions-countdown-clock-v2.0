import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CounterService } from './services/counter.service';
import { TimeService } from './services/time.service';
import { HighlightDirective } from './directives/highlight.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { ViewportDetectorDirective } from './directives/viewport-detector.directive';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    AutoFocusDirective,
    ViewportDetectorDirective,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [CounterService, TimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
