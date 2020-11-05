import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ToastrModule } from 'ngx-toastr';
import { JwtModule, JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login-component/login-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header-component/header-component.component';
import { HomeComponent } from './home-component/home-component.component';
import { FormComponent } from './form-component/form-component.component';
import { ViewEditComponent } from './view-edit-component/view-edit-component.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

import { AuthGuardService } from './services/auth-guard.service'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    FormComponent,
    ViewEditComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  entryComponents: [FormComponent, ViewEditComponent],

  providers: [ AuthGuardService, 
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService
   ],

  bootstrap: [AppComponent]
})
export class AppModule { }
