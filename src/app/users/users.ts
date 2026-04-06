import { Component, signal , computed, input,output, inject} from '@angular/core';
// import { DUMMY_USERS } from '../dummy-users';
import {User} from '../interfaces/user.model';
import { UserService } from './users.service';
import { ToastService } from '../toast/toast';
@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})


//signal way

// in signals we provide an initial value inside () then 
// to change the value we use set() method
// to read or extract any value we call signal value as function like this.selecteduser().avatar 
/* we use computed function which takes callback func as arg whenver we want to compute/read a signal and under the hood it also creates a signal 
   therefore we use () in the template with its name whenever we use that
*/





export class UserComponent
{
  // id=input.required<string>();
  // avatar=input<string>();
  // name=input<string>();

  user=input.required<User>();
  selected=input.required<boolean>();
  imagePath=computed(() => this.user().avatar);
  
  deleteUserTrigger=false;

  private toast = inject(ToastService);
  private userService=inject(UserService);
  //custom event we are creating in order to do some task by listening it it can be called as attribute in the tag of template

  // the button event listener is emitting id of the current user which can be accessed with the $event variable holding the value

  selectedUser=output<string>();

  selectedUserAfterDelete=output<string>();
  onSelectedUser()
  {
    this.selectedUser.emit(this.user().id);
  }
  deletePath="trash-can-regular.png";

  onDeleteUserTrigger()
  {
    this.deleteUserTrigger=true;
  }

  onDeleteUser()
  {
    this.userService.deleteUser(this.user().id);
    this.selectedUserAfterDelete.emit(this.user().id);
    this.toast.showToast('User deleted successfully!', 'info');
  }
}