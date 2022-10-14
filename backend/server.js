const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

// import routes
const desksRouter = require('./routes/desks.js')
const usersRouter = require('./routes/users.js')
const authRouter = require('./routes/auth.js')

// body parser
const app = express()

app.use(express.json()) 
// app.use(cors())
// app.options('*', cors()) // allow preflight
app.use((req, res, next) => {
	res.header({
		'Access-Control-Allow-Origin': 'http://localhost:8080',
		'Access-Control-Allow-Credentials': 'true',
		"Access-Control-Allow-Headers": "Content-Type"
	})
	next()
})
app.use(cookieParser())

// database connection
require('./atlasDbConnect.js')

// assign routes
app.use('/api/v1/desks', desksRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/auth', authRouter)


// start server
const port = process.env.PORT || 4000

app.listen(port, ()=> {
    console.log(`Server listening on port: ${port}...`)
})