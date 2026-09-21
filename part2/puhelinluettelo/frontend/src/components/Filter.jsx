const Filter = ({ value, handleFilterChange }) => (
  <div>
    filter shown with <input value={value} onChange={handleFilterChange} />
  </div>
);

export default Filter;
