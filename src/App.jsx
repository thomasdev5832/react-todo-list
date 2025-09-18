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

  // Calcula porcentagem de tarefas concluídas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const percentCompleted = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className='app'>
      <div className='main'>
      <h1>XLIST</h1>
      {/* Barra de progresso */}
      <div style={{ marginTop: '16px', marginBottom: '-20px' }}>
        <div style={{
          background: '#03a696d7',
          borderRadius: '2px',
          height: '5px',
          width: '100%',
          overflow: 'hidden',
         boxShadow: '0px 0px 5px #03A696'
        }}>
          <div style={{
            background: '#3BD9BC',
            width: `${percentCompleted}%`,
            height: '100%',
            transition: 'width 0.3s',
          }} />
        </div>
        
        <div style={{ color:'#03A696', textAlign: 'right', fontSize: '12px', marginTop: '10px' }}>
          {completedTasks} of {totalTasks} tasks completed
        </div>
        <div style={{ color:'#03A696', textAlign: 'right', fontSize: '12px', marginTop: '4px' }}>
          {percentCompleted}% completed
        </div>
      </div>
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
