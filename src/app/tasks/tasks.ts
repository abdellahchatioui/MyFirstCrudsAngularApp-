import { Component, signal, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TaskService,Task } from '../services/task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [ FormsModule,NgIf],
  standalone: true,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
    taskLevel = signal("Medium");
    tasks: Task[] = [];
    lastId: string = "";

    newTask: Task = {
      id: "0" ,
      title: "",
      level: this.taskLevel(),
      completed: false ,
    }

    constructor(private taskService : TaskService){};

  
    ngOnInit(){
      this.getTask();
      // this.tasks = this.taskService.getTask();
    }

    getTask(){
      this.taskService.getTasksFromApi()
        .subscribe(data => {
          // this.tasks = data;
          this.tasks = [...data]; 
          console.log("Data : ",data);
        }
        );
   
    }

    addTask(){
      this.lastId = this.tasks.at(-1)?.id ?? "0";
      const incrementId: number = Number(this.lastId) + 1; 
      this.newTask.id = ( incrementId.toString() || "0");
      console.log();
      this.taskService.postTask(this.newTask)
        .subscribe( {
            next: (response) => {
              this.newTask.title = "";
              this.getTask();
            },
            error: (err) => console.log("error in adding" ,err)
          }
        );
      
    };
      
    deleteTask(id: string) {
      console.log("id : ",id);
      
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.getTask();
        },
        error: (err) => {
          console.error('Delete failed: Check if ID exists on port 4000', err);
        }
      });} 

}
