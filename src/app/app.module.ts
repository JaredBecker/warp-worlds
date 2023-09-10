import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from '@shared/shared.module';
import { ScrollToTopDirective } from './shared/directives/scroll-to-top.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
    declarations: [
        AppComponent,
        ScrollToTopDirective,
        NavbarComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
            progressBar: true,
            extendedTimeOut: 5000,
        }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
