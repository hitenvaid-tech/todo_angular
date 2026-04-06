import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { UserComponent } from './users/users';
import { TasksComponent } from './tasks/tasks';
import { FormsModule } from '@angular/forms';
import { UserService } from './users/users.service';
import { NewUser } from './users/new-user/new-user';
// this is a decorator which provides metadata telling the markup is shown in templateUrl while the style is taken from styleUrl
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, UserComponent, TasksComponent, FormsModule,NewUser],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('angular_prc');

  private userService=inject(UserService);
  
  get users()
  {
    return this.userService.getAllUsers();
  }

  // selectedUserId='u1';
  selectedUserId?:string;  // here instead of selecting any dummy user we are just not selecting any user
  searchedUser='';

  addnewuser=false;
  get getselectedUserId()
  {
    return this.users.find((i)=> i.id===this.selectedUserId);
  }
  onSelectUser(id: string)
  {
    this.selectedUserId=id;
  }
  addNewUser()
  {
    this.addnewuser=true;
  }

  onClose()
  {
    this.addnewuser=false;
  }

  get filteredUsers()
  {
    return this.userService.getSearchedUsers(this.searchedUser);
  }
  onCheckSelectedUserAfterDelete(id: string)
  {
    if(this.selectedUserId===id)    {
      this.selectedUserId=undefined;
    }
  }
}