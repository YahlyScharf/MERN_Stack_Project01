import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
function CreateExercise() {


    const [exercise, setExercise] = useState({
        username: "",
        description: "",
        duration: "",
        date: new Date(),
        users: []
    });

    const [beenChanged, setBeenChanged] = useState(false)

    axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length > 0) {
                setExercise(prevValue => {
                    if (beenChanged === false) {
                        return {
                            username: response.data[0].username,
                            description: prevValue.description,
                            duration: prevValue.duration,
                            date: prevValue.date,
                            users: response.data.map(user => user.username)
                        }
                    } else {
                        return {
                            username: prevValue.username,
                            description: prevValue.description,
                            duration: prevValue.duration,
                            date: prevValue.date,
                            users: response.data.map(user => user.username)
                        }
                    }

                })
            }
        })






    function userNameChangeHandle(e) {
        const { value } = e.target;
        setExercise((prevValue) => {
            return {
                username: value,
                description: prevValue.description,
                duration: prevValue.duration,
                date: prevValue.date,
                users: prevValue.users
            }
        });

    }


    function descriptionChangeHandle(e) {
        const { value } = e.target;
        setExercise((prevValue) => {
            return {
                username: prevValue.username,
                description: value,
                duration: prevValue.duration,
                date: prevValue.date,
                users: prevValue.users
            }
        });

    }

    function durationChangeHandle(e) {
        const { value } = e.target;
        setExercise((prevValue) => {
            return {
                username: prevValue.username,
                description: prevValue.description,
                duration: value,
                date: prevValue.date,
                users: prevValue.users
            }
        });
    }





    function onSubmit(e) {
        e.preventDefault();
        console.log(exercise);

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));

        window.location = "/";
    };

    return (
        <div>
            <h3> Create a new exercise</h3>
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label>Username: </label>
                    <select
                        required
                        className="form-control"
                        value={exercise.username}
                        onChange={userNameChangeHandle}
                        onClick={() => setBeenChanged(true)}
                    >



                        {
                            exercise.users.map((user) => {
                                return <option
                                    key={user}
                                    value={user}>{user}
                                </option>;


                            })
                        }
                    </select>
                </div>


                <div className="form-group">
                    <label>Description: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={exercise.description}
                        onChange={descriptionChangeHandle}
                    />
                </div>


                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={exercise.duration}
                        onChange={durationChangeHandle}
                    />
                </div>


                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={exercise.date}
                            onChange={date => {
                                setExercise(prevValue => {
                                    return {
                                        username: prevValue.username,
                                        description: prevValue.description,
                                        duration: prevValue.duration,
                                        date: date,
                                        users: prevValue.users
                                    };
                                })
                            }}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}

export default CreateExercise;

