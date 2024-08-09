# todowithREACT

This Todo App is a simple, user-friendly task management tool built with React. It allows users to add, edit, delete, and search for todos. The application supports saving and loading todos from local storage, and includes features for toggling the visibility of completed tasks and undoing recent actions using toast notifications

## System Design
The application is designed with the following components:
**App Component**: The main component managing the state of todos, search functionality, and user interactions.
**Navbar Component**: A navigation bar that includes a search input for filtering todos.

## Features

- **Add Todos**: Easily add new tasks to your todo list.
- **Edit Todos**: Modify existing tasks.
- **Delete Todos**: Remove tasks with a confirmation toast and undo option.
- **Search Todos**: Quickly find tasks by typing in the search bar.
- **Filter Todos**: Toggle between showing all tasks or only incomplete ones.
- **Undo Delete**: Restore deleted tasks using an undo button within a toast notification.

## Technologies Used

- **React.js**: JavaScript library for building user interfaces.
- **React Icons**: For icons used within the app.
- **React Toastify**: For showing toast notifications with custom actions.
- **UUID**: To generate unique IDs for each todo.
- **Tailwind CSS**: for styling

  
## Key Features:

**Add Todos**: Users can input and save new todos.
**Edit Todos**: Users can edit existing todos.
**Delete Todos**: Users can delete todos with an undo option.
**Search Todos**: Users can search for todos by text.
**Show/Hide Completed Todos**: Users can toggle the visibility of completed tasks.
**Delete Completed Todos**: Users can delete all completed tasks with an undo option.

## Setup and Running the Application
1.**Clone the Repository**
    git clone https://github.com/raianushka/todowithReact.git
    cd todowithReact
2.**Install Dependencies**
    npm install
3.**Start the Application**
    npm start

## Usage:

**Add Todos**: Type in the input field and click "Save" or press Enter.
**Edit Todos**: Click the edit button next to a todo.
**Delete Todos**: Click the delete button next to a todo. An undo option will be available.
**Search Todos**: Type in the search box in the Navbar to filter todos.
**Show/Hide Completed Todos**: Use the checkbox to show or hide completed tasks.
**Delete Completed Todos**: Click the "Delete Completed Tasks" button to remove all completed tasks, with an undo option available.
    
    





