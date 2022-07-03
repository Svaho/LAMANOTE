import './Note.css'
import { useState } from 'react';
import axios from 'axios';
function AddNote () {
    const [todoValue, setTodoValue] = useState('')
    const handleChange = (val) => {
        setTodoValue(val)
    }

    const handleSubmit = () => {
        axios.post('http://localhost:4000/create-note', {
            note: todoValue
        })
        .then(() => {
            setTodoValue('')
            window.location.reload();
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <h6>Add New Note</h6>
            <div className="form-content">
                <input type="text" className="form-control" placeholder="Enter new note"  onChange={(e) => handleChange(e.target.value)} />
                <button className="btn btn-default btn-submit" onClick={handleSubmit}>+</button>
            </div>
        </>
    )
}

export default AddNote;