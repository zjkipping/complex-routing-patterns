import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Task, TaskManagerService } from '../task-manager.service';
import { EMPLOYEE_ID_PARAM } from '../employee.constants';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks: Observable<Task[]>;

  constructor(tms: TaskManagerService, route: ActivatedRoute) {
    this.tasks = route.paramMap.pipe(
      map(params => params.get(EMPLOYEE_ID_PARAM)),
      switchMap(employeeId => {
        if (employeeId) {
          return tms.getTasks(employeeId);
        } else {
          return of([]);
        }
      })
    );
  }
}
