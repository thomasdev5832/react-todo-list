import {useState} from 'react';

const TodoForm = () => {
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('enviou form');
    }

  return (
    <div className='todo-form'>
        <h2>Create task</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter a title' />
            <select>
                <option value="">Choose a category</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Study">Study</option>
            </select>
            <button type='submit'>Create task</button>
        </form>
    </div>
  )
}

export default TodoForm