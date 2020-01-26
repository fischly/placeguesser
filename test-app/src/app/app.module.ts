import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';

import { ProductListComponent } from './product-list/product-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { PanoViewComponent } from './pano-view/pano-view.component';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { QguideComponent } from './qguide/qguide.component';
import { HighscoresComponent } from './highscores/highscores.component';
import { DialogDelteComponent } from './dialog-delte/dialog-delte.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { DialogPassComponent } from './dialog-pass/dialog-pass.component';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { LogGuardService } from './log-guard.service';
import { MapViewComponent } from './map-view/map-view.component';
import { GameViewComponent } from './game-view/game-view.component';
import { ResultViewComponent } from './result-view/result-view.component';

/* even tho @types/googlemaps is installed, angular/ts compiler does not recognise it */
declare var google;

// const appRoutes: Routes = [
//   { path: 'pl/:id', component: ProductListComponent },
//   { path: '', redirectTo: '/pl/42', pathMatch: 'full' }
// ];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    TopBarComponent,
    PanoViewComponent,
    AccountComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    ProfileComponent,
    QguideComponent,
    HighscoresComponent,
    DialogDelteComponent,
    DialogPassComponent,
    DialogUserComponent,
    MapViewComponent,
    GameViewComponent,
    ResultViewComponent
  ],
  entryComponents: [DialogDelteComponent, DialogPassComponent, DialogUserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
    // RouterModule.forRoot(appRoutes, { enableTracing: true })
    // RouterModule.forRoot([{ path: 'pl/:id', component: ProductListComponent }])
  ],
  providers: [UserService, AuthGuardService, LogGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
