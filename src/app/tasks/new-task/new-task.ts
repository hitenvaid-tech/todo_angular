import { Component,output,input, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../tasks.service';
import { ToastService } from '../../toast/toast';
@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
})
export class NewTask {
  userId=input.required<string>();
  close = output<void>();
  // addTask= output<Task>();
  title='';
  summary='';
  due_date='';
  category='frontend';

  private toast = inject(ToastService);
  private taskService=inject(TaskService);

  onClose() {
    this.close.emit();
  }
  onSubmit(form:any)
  {
    if(form.invalid) 
    {
      this.toast.showToast('Please fill all fields properly', 'error');
      return;
    }

    const newTask={
      id:"t"+crypto.randomUUID(),
      userId:this.userId(),
      title:this.title,
      summary:this.summary,
      dueDate:this.due_date,
      category:this.category
    }
    // this.addTask.emit(newTask);

    this.taskService.addTask(newTask);
    this.close.emit();
    this.toast.showToast('Task added successfully!', 'success');
  }
}
