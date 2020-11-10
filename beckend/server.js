require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const uri = process.env.URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established succesfully');
});

const app = express();

app.use(cors());
app.use(express.json())


const exerciseRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exerciseRouter);
app.use("/users", usersRouter);

app.listen(5000 || process.env.PORT, () => {
    console.log("Server started on port 5000");
})