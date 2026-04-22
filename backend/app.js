const express = require('express')
const cors = require('cors')
require('dotenv').config()
const airoutes = require('./routes/airoutes')
const rateLimit = require('express-rate-limit')

const app = express()

app.set('trust proxy', 1)

const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: "Too many review requests from this Source, please try again some time." },
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/ai', aiLimiter, airoutes)

app.get('/', (req, res) => {
    res.send("Hello World")
})

const PORT = process.env.PORT || 7011;

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})

module.exports = app;