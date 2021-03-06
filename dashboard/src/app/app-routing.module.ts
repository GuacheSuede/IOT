import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GasesComponent } from './gases/gases.component';
import { AllComponent } from './all/all.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: AppComponent, data: { state: 'home'}},
  {path: 'gas', component: GasesComponent, data: { state: 'gas'}},
  {path: 'all', component: AllComponent, data: { state: 'all'}},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
