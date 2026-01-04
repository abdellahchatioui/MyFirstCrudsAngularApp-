import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Task {
  id : string;
  title : string;
  level : string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  
  private http = inject(HttpClient);

  getTasksFromApi(): Observable<Task[]>{
    return this.http.get<Task[]>(
      'http://localhost:4000/tasks'
    )
  };

  postTask(newTask: Task ): Observable<Task>{
    return this.http.post<Task>(
      'http://localhost:4000/tasks',
      newTask
    )
  };

  // In your service file
private apiUrl = 'http://localhost:4000/tasks'; 

deleteTask(id: string): Observable<Task> {
  // Ensure task.id is passed correctly (e.g., /tasks/11)
  const url = `${this.apiUrl}/${id}`; 
  return this.http.delete<Task>(url);
}

}
