import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    // Adicionamos a extensão explícita .ts ou garantimos o caminho relativo correto
    loadComponent: () => import('./login').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard').then(m => m.DashboardComponent)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];