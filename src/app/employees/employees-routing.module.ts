import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './employees.component';
import { TASK_ID_PARAM, EMPLOYEE_ID_PARAM } from './employee.constants';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

const routes: Routes = [
  { path: '', component: EmployeesComponent },
  {
    path: `:${EMPLOYEE_ID_PARAM}`,
    component: EmployeesComponent,
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      { path: 'tasks', component: TaskListComponent },
      { path: 'tasks/create', component: TaskFormComponent },
      { path: `tasks/:${TASK_ID_PARAM}/edit`, component: TaskFormComponent },
      { path: '**', redirectTo: 'tasks' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}
