import PropTypes from 'prop-types';

const Todo = ({ todo, removeTodo, completeTodo }) => {
  return (
    <div className="todo"
         style={{ 
          textDecoration: todo.isCompleted ? "line-through 2px" : "" 
          }}>
        <div className='content'>
            <p>{todo.text}</p>
            {todo.category && <p className='category'>({todo.category})</p>}
        </div>
        <div>
            <button className='complete' onClick={() => completeTodo(todo.id) } >✓</button>
            <button className='remove' onClick={() => removeTodo(todo.id) }>X</button>
        </div>
    </div>
  )
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.string,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  removeTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
};

export default Todo