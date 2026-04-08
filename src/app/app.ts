import { Component, signal, inject, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { UserComponent } from './users/users';
import { TasksComponent } from './tasks/tasks';
import { FormsModule } from '@angular/forms';
import { UserService } from './users/users.service';
import { NewUser } from './users/new-user/new-user';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
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
  
  users=this.userService.getAllUsers();

  selectedUserId=signal<string|undefined>(undefined);
  searchedUser=signal('');
  addnewuser=signal(false);



  searchedUsert$= toObservable(this.searchedUser).pipe(
    debounceTime(300),
    distinctUntilChanged()
  );

  debouncedSearchUser=toSignal(this.searchedUsert$, {initialValue: ''});

  selectedUser=computed(()=>{
    const id=this.selectedUserId();
    return id ? this.userService.usersMap().get(id) : undefined;
  })
  


  onSelectUser(id: string)
  {
    this.selectedUserId.set(id);
  }
  addNewUser()
  {
    this.addnewuser.set(true);
  }

  onClose()
  {
    this.addnewuser.set(false);
  }

  filteredUsers=computed(()=>{
    return this.users().filter((user) => {

      const search = this.debouncedSearchUser().toLowerCase();

      const matchesSearch = !search || user.name.toLowerCase().includes(search)

      return matchesSearch;
    });
  })
  // get filteredUsers()
  // {
  //   return this.userService.getSearchedUsers(this.searchedUser());
  // }

  onCheckSelectedUserAfterDelete(id: string)
  {
    if(this.selectedUserId()===id)    {
      this.selectedUserId.set(undefined);
    }
  }
}