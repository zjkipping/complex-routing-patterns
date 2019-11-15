import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

@NgModule({
  declarations: [EmployeesComponent, TaskListComponent, TaskFormComponent],
  imports: [CommonModule, EmployeesRoutingModule, ReactiveFormsModule]
})
export class EmployeesModule {}
