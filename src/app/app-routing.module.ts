import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from 'src/app/pages/user/user-list/user-list.component';


const routes: Routes = [

  {
    path: '',
    component: UserListComponent,
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.module').then(
        (m) => m.UserModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
