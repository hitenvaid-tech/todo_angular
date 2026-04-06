# AngularPrc

This project is a basic angular todo app with complex features implementing concepts like signals, decorators, parent-child communication and data input/output, directives like ngModel with 2 way binding, string interpolation, pipes and much more.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Project structure

Each component has its separate folder inside the app which is being imported and then used with help of selectors declared in component decorators

This project also uses model services which uses the concept of dependency injection to inject services from the model which can be used in multiple files.

## Features

Modular
Component Separated
Services Usage with dependency injection
Uses Snackbar for toast notifications
Implements complex search feature for tasks and users
Filters tasks based on their category