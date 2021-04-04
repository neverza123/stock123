import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { Test123Component } from './test123/test123.component';

const routes: Routes = [
  { path: 'store' ,component: StoreComponent},
  { path: 'test123' ,component: Test123Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
