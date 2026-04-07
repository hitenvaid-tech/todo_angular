import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.model";
import { signal, effect } from "@angular/core";
@Injectable({providedIn: 'root'})
export class UserService
{
    private users=signal<User[]>([
        {
            id: 'u1',
            name: 'jasmin',
            avatar: 'user-1.jpg',
        },
        {
            id: 'u2',
            name: 'komal',
            avatar: 'user-2.jpg',
        },
        {
            id: 'u3',
            name: 'aman',
            avatar: 'user-3.jpg',
        },
        {
            id: 'u4',
            name: 'hiten',
            avatar: 'user-4.jpg',
        },
        {
            id: 'u5',
            name: 'kim',
            avatar: 'user-5.jpg',
        },
        {
            id: 'u6',
            name: 'arjan',
            avatar: 'user-6.jpg',
        }
    ]);

    constructor()
    {
        const users=localStorage.getItem('users');
        if(users)
        {
            this.users.set(JSON.parse(users));
        }
        effect(() => {
            localStorage.setItem('users', JSON.stringify(this.users()));
        });
    }
    getAllUsers()
    {
        return this.users.asReadonly();
    }

    adddNewUser(newUser: User)
    {
        this.users.update((users) => [...users, newUser]);
        // this.users.push(newUser);
        // this.saveUsers();
    }

    // private saveUsers()
    // {
    //     localStorage.setItem('users',JSON.stringify(this.users));
    // }

    // getSearchedUsers(searchTerm:string)
    // {
    //     return this.users().filter((user) => {

    //         const search = searchTerm.toLowerCase();

    //         const matchesSearch = !search || user.name.toLowerCase().includes(search)

    //         return matchesSearch;
    //     });
    // }

    deleteUser(userId:string)
    {
        this.users.update((users) => users.filter((user) => user.id !== userId));
        // this.users = this.users.filter((user) => user.id !== userId);
        // this.saveUsers();
    }

}