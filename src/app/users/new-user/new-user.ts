import { Component,output,input, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../users.service';
import { ToastService } from '../../toast/toast';
@Component({
  selector: 'app-new-user',
  imports: [FormsModule],
  templateUrl: './new-user.html',
  styleUrl: './new-user.css',
})

export class NewUser{

  imageBase64: string = '';
  user='';
  close=output();

  private toast = inject(ToastService);
  private userService=inject(UserService);

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.imageBase64 = reader.result as string;
    };

    reader.readAsDataURL(file);
    
  }

  onCancel() {
    this.close.emit();
  }

  onSubmit(form:any){

     if (form.invalid || !this.imageBase64) 
      {
        this.toast.showToast('Please fill all fields properly', 'error');
        return;
      }
    const newUser={
      id:"u"+crypto.randomUUID(),
      name:this.user,
      avatar:this.imageBase64
    } 
    this.userService.adddNewUser(newUser);
    this.close.emit();
    this.toast.showToast('User added successfully!', 'success');
  }
}
