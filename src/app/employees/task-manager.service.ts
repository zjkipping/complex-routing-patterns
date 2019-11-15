import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

interface Entity {
  id: string;
}

export interface Task extends Entity {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  private taskData = new Map<string, Task[]>();
  private taskStream: BehaviorSubject<Map<string, Task[]>>;

  constructor() {
    this.taskData.set('e9201as8d', []);
    this.taskData.set('298afg8j2', []);
    this.taskData.set('87asdz7a2', []);
    this.taskStream = new BehaviorSubject(this.taskData);
  }

  getTasks(employeeId: string) {
    return this.taskStream
      .asObservable()
      .pipe(map(taskMap => taskMap.get(employeeId) || []));
  }

  getTask(employeeId: string, id: string) {
    const tasks = this.taskData.get(employeeId);
    if (tasks) {
      return of(tasks.find(task => task.id === id));
    } else {
      return of(undefined);
    }
  }

  async createTask(employeeId: string, task: Omit<Task, keyof Entity>) {
    let tasks =
      (await this.getTasks(employeeId)
        .pipe(take(1))
        .toPromise()) || [];

    tasks = [...tasks, { ...task, id: (tasks.length + 1).toString() }];
    this.taskData = new Map(this.taskData);
    this.taskData.set(employeeId, tasks);
    return this.taskStream.next(this.taskData);
  }

  async updateTask(employeeId: string, task: Task) {
    let tasks =
      (await this.getTasks(employeeId)
        .pipe(take(1))
        .toPromise()) || [];
    const index = tasks.findIndex(t => t.id === task.id);
    tasks = [
      ...tasks.slice(0, index),
      task,
      ...tasks.slice(index + 1, tasks.length)
    ];
    this.taskData = new Map(this.taskData);
    this.taskData.set(employeeId, tasks);
    return this.taskStream.next(this.taskData);
  }
}
