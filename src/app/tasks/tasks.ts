import { Component,input, inject } from '@angular/core';
import { TaskComponent } from './task/task';
import { FormsModule } from '@angular/forms';
import { NewTask } from './new-task/new-task';
import { Task } from '../interfaces/task.model';
import { TaskService } from './tasks.service';
import { signal, computed } from '@angular/core';
@Component({
  selector: 'app-tasks',
  imports: [TaskComponent,FormsModule,NewTask],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})

/*
export class TasksComponent 
{
  id=input.required<string>();
  name=input<string>();
  filter="";
  searchTerm="";
  isAddingTask=false;
  isAscending=true;


  private taskService=inject(TaskService);


  get selectedUserTasks()
  {
    const tasks=this.taskService.getUserTasks(this.id(),this.filter,this.searchTerm) ;

    return [...tasks].sort((a, b) => {

      const diff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();

      return this.isAscending ? diff : -diff;
    });

    // return tasks.sort((a, b) => {
      
    //   const diff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    //   return this.isAscending ? diff : -diff;

    // });
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
  */

export class TasksComponent 
{
  id = input.required<string>();
  name = input<string>();

  filter = signal('');
  searchTerm = signal('');
  isAscending = signal(true);
  isAddingTask = signal(false);

  private taskService = inject(TaskService);


  selectedUserTasks = computed(() => {
    const tasks = this.taskService.getTasks();
    const id = this.id();
    const filter = this.filter();
    const search = this.searchTerm().toLowerCase();
    const isAsc = this.isAscending();

    return tasks
      .filter((task) => {
        const matchesUser = task.userId === id;
        const matchesCategory = !filter || task.category === filter;

        const matchesSearch =
          !search ||
          task.title.toLowerCase().includes(search) ||
          task.summary.toLowerCase().includes(search) ||
          task.category.toLowerCase().includes(search) ||
          task.dueDate.toLowerCase().includes(search);

        return matchesUser && matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const diff =
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        return isAsc ? diff : -diff;
      });
  });

  onAdd() {
    this.isAddingTask.set(true);
  }

  onClose() {
    this.isAddingTask.set(false);
  }

  toggleSort() {
    this.isAscending.update((v) => !v);
  }
}
