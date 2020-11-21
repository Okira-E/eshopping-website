import { AdminAuthGuard } from './services/admin-auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth.guard';
import { AuthInterceptor } from './services/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminAddUserComponent } from './admin/admin-add-user/admin-add-user.component';
import { AdminAddProductComponent } from './admin/admin-add-product/admin-add-product.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminLoginComponent },
  {
    path: 'admin/dashboard',
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
  },
  // {
  //   path: 'admin/dashboard/user',
  //   component: AdminDashboardUserComponent,
  //   canActivate: [AdminAuthGuard],
  // },
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminComponent,
    AdminUserComponent,
    AdminAddUserComponent,
    AdminAddProductComponent,
    AdminProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    AdminAuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
