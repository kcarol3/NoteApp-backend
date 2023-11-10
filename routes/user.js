const router = require("express").Router()
const { User, validate } = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body)

        if (error){
            console.log(error)
            return res.status(400).send({ message: error })
        }
        const user = await User.findOne({ email: req.body.email })
        if (user){
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" })
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        await new User({ ...req.body, password: hashPassword, notes: [] }).save()
        const newUser = await User.findOne({ email: req.body.email })
        const token = newUser.generateAuthToken();
        res.status(201).send({data: token, message: "User created successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" })
    }
})

router.get("/", async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        console.log(user)
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router