import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './modules/chat/chat-room/chat-room.component';
import { LoginComponent } from './modules/core/login/login.component';
import { MainComponent } from './modules/core/main/main.component';
import { RegisterComponent } from './modules/core/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'chat',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ChatRoomComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
