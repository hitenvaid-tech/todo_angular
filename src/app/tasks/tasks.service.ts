import { Injectable } from "@angular/core";
import { Task } from "../interfaces/task.model";
import { signal, effect } from "@angular/core";
@Injectable({providedIn: 'root'})

/*
export class TaskService
{
    private tasks=[
    {
      id:'t1',
      userId:'u1',
      title:'Angular',
      summary:'angular sub topics of dependency injection',
      dueDate:'2026-04-30',
      category:'frontend'
    },
    {
      id:'t2',
      userId:'u2',
      title:'Angular',
      summary:'proprty binding data',
      dueDate:'2026-04-18',
      category:'frontend'
    },
    {
      id:'t3',
      userId:'u3',
      title:'SpringBoot',
      summary:'springboot tests',
      dueDate:'2026-04-12',
      category:'backend'
    },
    {
      id:'t4',
      userId:'u3',
      title:'SpringBoot',
      summary:'testing and compiling',
      dueDate:'2026-04-12',
      category:'backend'
    },
    {
      id:'t5',
      userId:'u3',
      title:'SpringBoot',
      summary:'new page model design',
      dueDate:'2026-04-12',
      category:'backend'
    },
    {
      id:'t6',
      userId:'u3',
      title:'Angular',
      summary:'UI performence improvement',
      dueDate:'2026-04-12',
      category:'frontend'
    },
  ];


    constructor()
    {
        const tasks=localStorage.getItem('tasks');
        if(tasks)
        {
            this.tasks=JSON.parse(tasks);
        }
    }

    getUserTasks(id:string, filter:string, searchTerm:string)
    {
        return this.tasks.filter((task) => {

        // user filter
        const matchesUser = task.userId === id;

        // category filter
        const matchesCategory = !filter || task.category === filter;

        // search filter (case-insensitive, across all fields)
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            !search ||
            task.title.toLowerCase().includes(search) ||
            task.summary.toLowerCase().includes(search) ||
            task.category.toLowerCase().includes(search) ||
            task.dueDate.toLowerCase().includes(search);

        return matchesUser && matchesCategory && matchesSearch;
    });
  }

  removeTask(id:string)
  {
    this.tasks=this.tasks.filter((u)=>u.id!==id);
    this.saveTasks();
  }

  addTask(newTask: Task)
  {
    // this.tasks.push(newTask);
    this.tasks = [...this.tasks, newTask];
    this.saveTasks();
  }

  private saveTasks()
  {
    localStorage.setItem('tasks',JSON.stringify(this.tasks));
  }
  
}
*/



export class TaskService 
{
  private tasks = signal<Task[]>([
    {
      id:'t1',
      userId:'u1',
      title:'Angular',
      summary:'angular sub topics of dependency injection',
      dueDate:'2026-04-30',
      category:'frontend'
    },
    {
      id:'t2',
      userId:'u2',
      title:'Angular',
      summary:'proprty binding data',
      dueDate:'2026-04-18',
      category:'frontend'
    },
    {
      id:'t3',
      userId:'u3',
      title:'SpringBoot',
      summary:'springboot tests',
      dueDate:'2026-04-12',
      category:'backend'
    },
    {
      id:'t4',
      userId:'u3',
      title:'SpringBoot',
      summary:'testing and compiling',
      dueDate:'2026-04-12',
      category:'backend'
    },
    {
      id:'t5',
      userId:'u3',
      title:'SpringBoot',
      summary:'new page model design',
      dueDate:'2026-04-12',
      category:'backend'
    },
    {
      id:'t6',
      userId:'u3',
      title:'Angular',
      summary:'UI performence improvement',
      dueDate:'2026-04-12',
      category:'frontend'
    },
  ]);

  constructor() 
  {
    const stored = localStorage.getItem('tasks');
    if (stored) 
    {
      this.tasks.set(JSON.parse(stored));
    }

    effect(() => {
      localStorage.setItem('tasks', JSON.stringify(this.tasks()));
    });
  }

  // expose readonly signal
  getTasks = this.tasks.asReadonly();

  addTask(task: Task) {
    this.tasks.update((prev) => [...prev, task]);
  }

  removeTask(id: string) {
    this.tasks.update((prev) => prev.filter((t) => t.id !== id));
  }
}