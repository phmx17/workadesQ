const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')

// import routes
const desksRouter = require('./routes/desks.js')
const authRouter = require('./routes/auth.js')

// body parser
const app = express()

app.use(express.json()) 
app.use(cors())

// database connection
require('./atlasDbConnect.js')

// assign routes
app.use('/api/v1/desks', desksRouter)
app.use('/api/v1/auth', authRouter)


// start server
const port = process.env.PORT || 4000

app.listen(port, ()=> {
    console.log(`Server listening on port: ${port}...`)
})