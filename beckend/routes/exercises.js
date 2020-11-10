const router = require("express").Router();
const Exercise = require("../moduels/exercise-moduel");

router.route("/").get((req, res) => {
    Exercise.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err))

});

router.route("/add").post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username: username,
        description: description,
        duration: duration,
        date: date
    });

    newExercise.save()
        .then(() => res.json("exercise added"))
        .catch(err => res.status(400).json(err))


});


router.route("/:id").get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json(err))
});

router.route("/:id").delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json("exercise deleted"))
        .catch(err => res.status(400).json(err))
});

router.route("/update/:id").post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json("exercise updated"))
                .catch(err => res.status(400).json(err))

        })
        .catch(err => res.status(400).json(err))
});



module.exports = router;