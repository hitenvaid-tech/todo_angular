import { Component,input,output, inject} from '@angular/core';
import { Task } from '../../interfaces/task.model';
import { DatePipe } from '@angular/common';
import { TaskService } from '../tasks.service';
import { ToastService } from '../../toast/toast';
@Component({
  selector: 'app-task',
  imports: [DatePipe],
  templateUrl: './task.html',
  styleUrl: './task.css',
})


export class TaskComponent 
{
  task=input.required<Task>();
  // completed=output<string>();

  private toast = inject(ToastService);
  private taskService=inject(TaskService);
  // onComplete()
  // {
  //   this.completed.emit(this.task().id);
  // }
  onComplete()
  {
    this.taskService.removeTask(this.task().id);
    this.toast.showToast('Task completed and removed successfully!', 'success');
  }
}
