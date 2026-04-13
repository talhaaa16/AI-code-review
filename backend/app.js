const express = require('express')
const cors = require('cors')
require('dotenv').config()
const airoutes = require('./routes/airoutes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/ai', airoutes)

app.get('/', (req, res) => {
    res.send("Hello World")
})

const PORT = process.env.PORT || 7011;

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})

module.exports = app;