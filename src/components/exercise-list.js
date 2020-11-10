import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete';


function ExerciseList() {

    const [exercises, setExercises] = useState([]);

    function Exercise(props) {
        return (
            <tr>
                <td>{props.exercise.username}</td>
                <td>{props.exercise.description}</td>
                <td>{props.exercise.duration}</td>
                <td>{props.exercise.date.substring(0, 10)}</td>
                <td>
                    <a href="/" onClick={() => { props.deleteExercise(props.exercise._id) }}> <DeleteIcon />  </a>
                </td>
            </tr>
        );
    }


    axios.get('http://localhost:5000/exercises/')
        .then(response => {
            setExercises(response.data)
        })
        .catch(err => console.log(err));

    function deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then((res) => console.log(res.data))
        setExercises(() => {
            exercises.filter(el => {
                return el._id !== id
            });
        })

    }

    function ExerciseList() {
        return exercises.map((currentExercise) => {
            return <Exercise exercise={currentExercise} deleteExercise={deleteExercise} key={currentExercise._id} />
        })
    }


    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <ExerciseList />
                </tbody>
            </table>
        </div>
    );
};

export default ExerciseList;