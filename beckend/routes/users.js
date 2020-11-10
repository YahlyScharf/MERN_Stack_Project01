const router = require("express").Router();
const User = require("../moduels/users-moduel");


router.route("/").get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err))

});

router.route("/add").post((req, res) => {
    const username = req.body.username;

    const newUser = new User({ username });

    newUser.save()
        .then(() => res.json("user added!"))
        .catch(err => res.status(400).json(err));
});


module.exports = router;