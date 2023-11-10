const router = require("express").Router()
const { User } = require("../models/user")
const bcrypt = require("bcrypt")
const Joi = require("joi")
const jwt = require("jsonwebtoken");

router.get("/check", async(req, res) => {
    let token = req.headers.authorization;
    const decodedToken = jwt.decode(token);
    try {
        const decodeduser = jwt.verify(token, process.env.JWTPRIVATEKEY);
        console.log("Token poprawny, użytkownik: " + decodeduser._id);
        res.status(200).send("Authorized user");
    } catch (err) {
        console.log("Unauthorized!");
        res.status(401).send({message: "Unauthorized!"});
    }
})

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        const user = await User.findOne({ email: req.body.email })
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" })
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!validPassword){
            res.status(401).send({ message: "Invalid Email or Password" })
        } else {
            const token = user.generateAuthToken();
            console.log(token)
            //res.status(500).json({data:token, message:"logged in successfully"});
            res.status(201).send({ data: token, message: "logged in successfully" })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})



const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    })
    return schema.validate(data)
}
module.exports = router