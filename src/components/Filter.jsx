import PropTypes from 'prop-types';

const Filter = ({ filter, setFilter, setSort }) => {
  return (
    <div className="filter">
        <h3>Filters</h3>
        <div className="filter-options">
            <div>
                <p>Status:</p>
                <select className="status-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Incompleted">Incompleted</option>
                </select>
            </div>
            <div>
                <p>Order:</p>
                <div className="order">
                    <button onClick={() => setSort("Asc")} >Up</button>
                    <button onClick={() => setSort("Desc")} >Down</button>
                </div> 
            </div>
        </div>
    </div>
  )
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
};

export default Filter