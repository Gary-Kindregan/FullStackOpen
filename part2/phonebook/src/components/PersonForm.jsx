const PersonForm = ({ onSubmit, name, number, onNameChange, onNumberChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <div>name: <input value={name} onChange={onNameChange} /></div>
                <div>number: <input value={number} onChange={onNumberChange} /></div>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
}

export default PersonForm;