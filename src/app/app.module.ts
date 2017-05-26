import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { routing } from './app.routes';

// NG-SEMANTIC UI
import { NgSemanticModule } from 'ng-semantic/ng-semantic';

// CORE
import {
  TokenAuthService, ErrorLogService, LOGGING_ERROR_HANDLER_PROVIDERS, AuthHttp, SecurityService,
  CoreModule, StringService, LoggedInGuard
} from './core';

// REDUX
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { Reducers } from './redux';

// TOASTER
import { ToasterModule } from 'angular2-toaster/angular2-toaster';

// SHARED
import { SharedModule } from './shared/shared.module';

// HOME
import { HomeComponent, HomeService } from './home-component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ToasterModule,
    HttpModule,
    CoreModule,
    SharedModule,
    NgSemanticModule,
    routing,
    StoreModule.provideStore(Reducers.reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [
    AuthHttp, HomeService,
    StringService, ErrorLogService, LoggedInGuard,
    TokenAuthService, SecurityService, LOGGING_ERROR_HANDLER_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
