import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { WriteReviewComponent } from './pages/write-review/write-review.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent } ,
  { path: 'signUp', component: CreateAccountComponent },
  { path: 'writeReview', component: WriteReviewComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],


  exports: [RouterModule]
  
})
export class AppRoutingModule { }
