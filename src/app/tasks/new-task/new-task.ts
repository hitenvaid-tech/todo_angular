import { Component,output,input, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../tasks.service';
import { ToastService } from '../../toast/toast';
import { signal } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  title=signal('');
  summary=signal('');
  dueDate=signal('');
  category=signal('frontend');

  minDate = new Date().toISOString().split('T')[0];
  private toast = inject(ToastService);
  private taskService=inject(TaskService);

  onClose() {
    this.close.emit();
  }
  onSubmit(form:NgForm)
  {
    if(form.invalid) 
    {
      form.control.markAllAsTouched();
      this.toast.showToast('Please fill all fields properly', 'error');
      return;
    }


    // const newTask = {
    //   id: "t" + crypto.randomUUID(),
    //   userId: this.userId(),
    //   ...form.value   
    // };

    const newTask = {
      id: 't' + crypto.randomUUID(),
      userId: this.userId(),
      title: this.title(),
      summary: this.summary(),
      dueDate: this.dueDate(),
      category: this.category(),
    };

    this.taskService.addTask(newTask);

    this.title.set('');
    this.summary.set('');
    this.dueDate.set('');
    this.category.set('frontend');


    form.resetForm({
        category: 'frontend'
    });

    this.close.emit();
    this.toast.showToast('Task added successfully!', 'success');
  }
}
