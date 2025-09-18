import { useState, useEffect } from 'react';
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';
import Footer from './components/Footer';

function App() {
  // Carrega tasks do sessionStorage ao iniciar
  const [tasks, setTasks] = useState(() => {
    const saved = sessionStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");


  useEffect(() => {
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, category) => {
    if (text.trim() === '') return;
    const newTasks = [
      ...tasks, 
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
      },
    ];
    setTasks(newTasks);
  };

  const toggleTask = (id) => {
    const newTasks = [...tasks]
    newTasks.map((task) => task.id === id ? task.isCompleted = !task.isCompleted : task)
    setTasks(newTasks);
  };

  const removeTask = (id) => {
    const newTasks = [...tasks];
    const filteredTasks = newTasks.filter((task) => 
      task.id !== id ? task : null
    );
    setTasks(filteredTasks);
  };

  return (
    <div className='app'>
      <div className='main'>
      <h1>TO-DO LIST</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className='todo-list'>
        {tasks
          .filter((task) => 
            filter === "All" 
              ? true
              : filter === "Completed" 
              ? task.isCompleted 
              : !task.isCompleted
          )
          .filter((task) => 
            task.text.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => sort === "Asc" 
            ? a.text.localeCompare(b.text)
            : b.text.localeCompare(a.text)
          )
          .map((task) => (
            <Todo 
              key={task.id}
              todo={task}
              removeTodo={removeTask}
              completeTodo={toggleTask}
            />
        ))}
      </div>
      <TodoForm addTodo={addTask} />
      </div>
      <Footer />
    </div>
    
  );
}

export default App;
