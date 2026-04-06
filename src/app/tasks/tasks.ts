import { Component,input, inject } from '@angular/core';
import { TaskComponent } from './task/task';
import { FormsModule } from '@angular/forms';
import { NewTask } from './new-task/new-task';
import { Task } from '../interfaces/task.model';
import { TaskService } from './tasks.service';
@Component({
  selector: 'app-tasks',
  imports: [TaskComponent,FormsModule,NewTask],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})

export class TasksComponent 
{
  id=input.required<string>();
  name=input<string>();
  filter="";
  searchTerm="";
  isAddingTask=false;


  private taskService=inject(TaskService);


  get selectedUserTasks()
  {
    return this.taskService.getUserTasks(this.id(),this.filter,this.searchTerm);
  }


  onAdd()
  {
    this.isAddingTask=true;
  }
  onClose()
  {
    this.isAddingTask=false;
  }

  // onSubmit(newTask: Task)
  // {
  //   this.isAddingTask=false;
  //   // this.tasks.push(newTask);
  //   this.taskService.addTask(newTask);
  // }
}
