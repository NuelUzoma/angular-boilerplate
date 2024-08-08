import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SignupComponent } from './features/signup/signup.component';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: HomeComponent}, // Home
    { path: 'signup', component: SignupComponent}, // Signup Route
    { path: 'login', component: LoginComponent}, // Login Route
    { path: 'dashboard', component: DashboardComponent} // Dashboard Route
];