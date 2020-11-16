import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskUrl: string;

  constructor(private http: HttpClient) {
    this.taskUrl = 'http://localhost:8080/assignedTask';
  }

  public findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl);
  }

  public findTaskById(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl);
  }

  public save(task: Task) {
    return this.http.post<Task>(this.taskUrl, task);
  }

  public async updateTask(task: Task){
    return await this.http.put(this.taskUrl + (`/${task.taskId}`), task).toPromise();
  }


}
