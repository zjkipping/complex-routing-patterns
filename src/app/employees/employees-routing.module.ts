import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './employees.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent
  },
  {
    path: ':employeeId',
    component: EmployeesComponent,
    children: [
      { path: '', redirectTo: 'tasks' },
      {
        path: 'tasks',
        component: TaskListComponent
      },
      {
        path: 'tasks/create',
        component: TaskFormComponent
      },
      {
        path: 'tasks/:taskId/edit',
        component: TaskFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}
