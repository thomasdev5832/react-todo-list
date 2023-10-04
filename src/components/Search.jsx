const Search = ({ search, setSearch }) => {
  return (
    <div className="search">
        <h3>Search:</h3>
        <input 
            type="text" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder="Enter to search" 
        />
    </div>
  )
}

export default Search