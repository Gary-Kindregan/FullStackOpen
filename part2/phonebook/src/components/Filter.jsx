const Filter = ({ onFilterChange }) => {
    return (
        <>
            filter shown with: <input onChange={onFilterChange} />
        </>
    );
}

export default Filter;