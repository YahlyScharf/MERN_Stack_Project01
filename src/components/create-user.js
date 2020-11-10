import React, { useState } from 'react';
import axios from 'axios';



function CreateUser() {
    const [username, setUsername] = useState({
        username: ""
    })

    function changeHandle(e) {
        const { value } = e.target;
        setUsername({ username: value });
    };

    function onSubmit(e) {
        e.preventDefault();

        axios.post('http://localhost:5000/users/add', username)
            .then(res => console.log(res.data));

        setUsername({ username: "" })
    };



    return (

        <div>
            <h3> Create a user</h3>
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label>Username: </label>
                    <input type="text" required className="form-control" value={username.username} onChange={changeHandle}></input>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};

export default CreateUser;
