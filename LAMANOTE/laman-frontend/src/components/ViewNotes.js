import { useEffect, useState } from 'react';
import axios from 'axios';
import './Note.css'

var apiBaseUrl = 'http://localhost:4000';
function ViewNotes() {
    const [todos, setTodos] = useState([]);
    const [updateTodoValue, setUpdateTodoValue] = useState('');
    useEffect(() => {
        axios.get(`${apiBaseUrl}/notes`)
        .then((response) => {
            setTodos(response.data)})
        .catch((err) => console.log(err))
    },[])

    const handleDelete = (id) => {
        axios.delete(`${apiBaseUrl}/note/${id}`)
        .then(() => {
            window.location.reload();
        })
        .catch(() => alert("unable to delete todo"))
    }

    const handleChange = (val, defaultVal) => {
        console.log(defaultVal)
        setUpdateTodoValue(val)
    }

    const updateTodo = (id) => {
        axios.patch(`${apiBaseUrl}/note/${id}`, {
            note: updateTodoValue
        })
        .then(() => {
            window.location.reload();
        })
        .catch((err) => {
            console.log("Unable to update todo")
        })
    }

    return (
        <>
            <h5>Old Notes</h5>
            {
                todos.length > 0 ? (todos.map((todo) => {
                    return (
                        <div className="form-content mt-2" key={todo.id}>
                            <input type="text" id='todo-input' placeholder={todo.note} className="form-control" onChange={(e) => handleChange(e.target.value)} />
                            <button className="btn btn-default btn-submit" onClick={() => handleDelete(todo.id)}>X</button>
                            <button className="btn btn-default btn-submit" onClick={() => updateTodo(todo.id)}>Y</button>
                        </div>
                    )
                })) : <h6>No Notes</h6>
            }
        </>
    )
}

export default ViewNotes;