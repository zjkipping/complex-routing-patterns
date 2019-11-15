import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { map, take } from 'rxjs/operators';

import { TaskManagerService, Task } from '../task-manager.service';
import { TASK_ID_PARAM, EMPLOYEE_ID_PARAM } from '../employee.constants';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  task: Task | undefined;
  employeeId: string | undefined;

  constructor(
    private tms: TaskManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl()
    });
  }

  async ngOnInit() {
    this.employeeId = await this.route.paramMap
      .pipe(
        map(params => params.get(EMPLOYEE_ID_PARAM) || undefined),
        take(1)
      )
      .toPromise();

    const taskId = await this.route.paramMap
      .pipe(
        map(params => params.get(TASK_ID_PARAM)),
        take(1)
      )
      .toPromise();

    if (this.employeeId && taskId) {
      this.task = await this.tms
        .getTask(this.employeeId, taskId)
        .pipe(take(1))
        .toPromise();

      if (this.task) {
        this.taskForm.patchValue(this.task);
      }
    }
  }

  async submit() {
    if (this.employeeId) {
      if (this.task) {
        await this.tms.updateTask(this.employeeId, {
          ...this.task,
          ...this.taskForm.value
        });
        return this.router.navigate(['../../'], { relativeTo: this.route });
      } else {
        await this.tms.createTask(this.employeeId, this.taskForm.value);
        return this.router.navigate(['../'], { relativeTo: this.route });
      }
    }
  }
}
