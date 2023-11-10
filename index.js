require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require("./routes/user")
const authRoutes = require("./routes/auth")
const noteRoute = require("./routes/note")
const tokenVerification = require('./middleware/tokenVerification')


//middleware
app.use(express.json())
app.use(cors({
    origin: '*'
}));

//protected routes
app.use("/api/note", tokenVerification)
app.get("/api/users", tokenVerification)

// routes
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/note", noteRoute)

app.listen(process.env.PORT, () => {console.log(`Nasłuchiwanie na porcie ${process.env.PORT}`)})

const connection = require('./db')
connection()



