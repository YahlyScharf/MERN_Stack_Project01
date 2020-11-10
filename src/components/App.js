import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./navbar";
import exercisesList from "./exercise-list";
import createExercise from "./create-exercise";
import createUser from "./create-user";


function App() {
    return (
        <Router>
            <div class="container">
                <NavBar />
                <br />
                <Route path="/" exact component={exercisesList} />
                <Route path="/create" component={createExercise} />
                <Route path="/user" component={createUser} />
            </div>
        </Router>
    );
}

export default App;
