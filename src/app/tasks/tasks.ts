import { Component,input, inject } from '@angular/core';
import { TaskComponent } from './task/task';
import { FormsModule } from '@angular/forms';
import { NewTask } from './new-task/new-task';
import { Task } from '../interfaces/task.model';
import { TaskService } from './tasks.service';
import { signal, computed } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-tasks',
  imports: [TaskComponent,FormsModule,NewTask],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})


export class TasksComponent 
{
  id = input.required<string>();
  name = input<string>();

  filter = signal('');
  searchTerm = signal('');
  isAscending = signal(true);
  isAddingTask = signal(false);

  private taskService = inject(TaskService);



  serach$= toObservable(this.searchTerm).pipe(
    debounceTime(300),
    distinctUntilChanged()
  );

  debounedSearchTerm=toSignal(this.serach$, {initialValue: ''});


  selectedUserTasks = computed(() => {
    // const tasks = this.taskService.getTasks();

    const tasks = this.taskService.tasksByUser().get(this.id()) || [];
    // const id = this.id();
    const filter = this.filter();
    const search = this.debounedSearchTerm().toLowerCase();
    const isAsc = this.isAscending();

    return tasks.filter((task) => {

        // const matchesUser = task.userId === id;
        const matchesCategory = !filter || task.category === filter;


        const searchText = `${task.title} ${task.summary} ${task.category}`.toLowerCase();
        const matchesSearch = !search || searchText.includes(search);

        return matchesCategory && matchesSearch;
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
