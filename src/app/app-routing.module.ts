import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TodosComponent } from './components/todos/todos.component';
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'todos', 
    component: TodosComponent, 
    canActivate: [AuthGuard], 
    canDeactivate: [UnsavedChangesGuard] 
  },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
