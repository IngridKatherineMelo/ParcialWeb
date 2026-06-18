import { Routes } from '@angular/router';
import { PersonasPage } from './personas.page';

export const routes: Routes = [
  { path: '', redirectTo: 'personas', pathMatch: 'full' },
  { path: 'personas', component: PersonasPage },
];