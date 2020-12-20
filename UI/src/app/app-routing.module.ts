import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from '../app/settings/settings.component'
import { MainComponent } from '../app/main/main.component'
const routes: Routes = [
  {
    path:"settings",
    component:SettingsComponent
  },
  {
    path:"",
    component:MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
