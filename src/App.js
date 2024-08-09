import Navbar from './components/Navbar';
import './App.css';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importing uuid to generate unique IDs
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import data from "./data"; // Importing initial data from a local JSON file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {

  // State to manage the current todo input
  const [todo, setTodo] = useState("");

  // State to manage the list of todos
  const [todos, setTodos] = useState(data);

  // State to manage whether to show completed tasks or not
  const [showdone, setShowdone] = useState(true);

  // State to check if todos have been loaded from local storage
  const [isLoaded, setIsLoaded] = useState(false);

  // State to manage the search term input
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect hook to get the todos from the local storage on first render
  useEffect(() => {
    const todoString = localStorage.getItem("todos")
    if (todoString) {
      const todos = JSON.parse(todoString)
      setTodos(todos)   // Set todos from local storage if available
    }
    setIsLoaded(true);  // Mark todos as loaded
  }, [])

  // useEffect hook to update the local storage whenever todos change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(todos)); // Save todos to local storage
    }
  }, [todos, isLoaded]);

  // Function to handle editing a todo
  const handleEdit = (e, id) => {
    const t = todos.filter(i => i.id === id)  // Find the todo to edit
    setTodo(t[0].todo)  // Find the todo to edit
    const newTodos = todos.filter(item => item.id !== id) // Remove the edited todo from the list
    setTodos(newTodos) // Update the state with the new list

  }

  const showToast = (message, actionLabel, action,type = 'default') => {
    toast[type](
      ({ closeToast }) => (
        <div className='flex justify-between items-center'>
          <span>{message}</span>
          <button
            onClick={() => {
              action(); // Perform the action (e.g., undo delete)
              closeToast(); // Close the toast
            }}
            className='ml-2 bg-blue-500 text-white p-1 rounded'
          >
            {actionLabel}
          </button>
        </div>
      ),
      { autoClose: 5000 } // Auto close after 5 seconds
    );
  };

  // Function to handle deleting a todo
  const handleDelete = (e, id) => {
    const deletedTodo = todos.find(item => item.id === id);
    const newTodos = todos.filter(item => item.id !== id); // Filter out the todo to be deleted
    setTodos(newTodos) // Update the state with the new list

    showToast(
      'Todo deleted!',
      'Undo',
      () => setTodos([deletedTodo, ...newTodos]), // Undo action
      'success'
    );

  }

  // Function to handle adding a new todo
  const handleAdd = () => {
    setTodos([...todos,
    { id: uuidv4(), todo, isCompleted: false, timestamp: new Date().toLocaleString(), }])
    setTodo("")// Clear the input field
  }

  // Function to handle input change
  const handleChange = (e) => {
    setTodo(e.target.value) // Update the todo state with the input value
  }

  // Function to handle the Enter key press
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {  // If Enter key is pressed Call the handleAdd function
      handleAdd();
    }
  };

  // Function to toggle the visibility of completed tasks
  const toggleFinished = (params) => {
    setShowdone(!showdone);
  }


  // Function to handle checkbox change
  const handleCheckbox = (e) => {
    // Get the id of the todo from the checkbox
    const id = e.target.name;
    // Find the index of the todo
    const index = todos.findIndex(item => {
      return item.id == id;
    })
    // Toggle the isCompleted state
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }

  // Function to handle search input change
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Function to handle deleting all completed tasks
  const handleDeleteCompleted = () => {
    const completedTodos = todos.filter(todo => todo.isCompleted);
    const newTodos = todos.filter(item => !item.isCompleted); // Filter out completed tasks
    setTodos(newTodos);

    showToast(
      'Completed tasks deleted!',
      'Undo',
      () => setTodos([...todos, ...completedTodos]), // Undo action
      'success'
    );
  };

  // Filter todos based on searchTerm
  const filteredTodos = todos.filter(todo => {
    return todo.todo.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <Navbar onSearch={handleSearch} />  {/* Navbar component with search functionality */}
      <div className='flex flex-col mx-auto my-2 p-5 bg-indigo-100 rounded-xl min-h-[80vh] w-3/4 items-center '>
        <div className='flex justify-center flex-col items-center w-3/4'>
          <div className=' text-lg font-bold '>Add a Todo</div>
          <div className='w-full flex justify-center my-2'>
            <input type='text' className='w-full p-2 rounded-md'
              onChange={handleChange} onKeyDown={handleKeyDown}
              value={todo} />
            <button onClick={handleAdd} disabled={todo.length < 3}
              className='bg-indigo-800 hover:bg-indigo-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-4 disabled:bg-slate-400' >
              Save</button>
          </div>
          <div className='flex flex-col p-2 w-full gap-2'>
            <div>
              <input type='checkbox' checked={todo.isCompleted} onChange={toggleFinished} />
              Show Completed tasks</div>
            <div className='flex justify-between w-full items-baseline'>
              <h2 className='text-lg font-bold'>Your Todos</h2>
              <button onClick={handleDeleteCompleted}
                className='bg-red-500 hover:bg-red-400 p-2 text-sm font-bold text-white rounded-md mx-1 w-max'>
                Delete Completed Tasks
              </button>
            </div>
          </div>

          <div className='todos flex flex-col w-full'>
            {filteredTodos.length === 0 && <div className='m-5'>No Todos to Display</div>}
            {filteredTodos.map(item => {
              return (showdone || !item.isCompleted) &&
                <div>
                  <div className='todo flex justify-between my-2 bg-indigo-50 p-3 rounded-md'>
                    <div className='flex flex-col'>
                      <div className="text-xs text-gray-500">
                        {item.timestamp}
                      </div>
                      <div className='flex gap-2 my-4'>
                        <input onChange={handleCheckbox} type='checkbox'
                          checked={item.isCompleted} name={item.id} />
                        <div className={item.isCompleted ? "line-through break-all" : "break-all"}>
                          {item.todo}
                        </div>
                      </div>
                    </div>


                    <div className='buttons flex max-h-8'>
                      <button onClick={(e) => { handleEdit(e, item.id) }}
                        className='bg-indigo-800 hover:bg-indigo-950 p-2 text-sm font-bold text-white rounded-md mx-1'>
                        <AiFillEdit />
                      </button>
                      <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-indigo-800 hover:bg-indigo-950 p-2 text-sm font-bold text-white rounded-md mx-1'>
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
            })}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}



export default App;
