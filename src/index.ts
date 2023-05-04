import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'


const app = express()

app.use(cors({
    credentials: true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(8080, () => {
    console.log('Server running');
})

const mongoUrl = 'mongodb+srv://username:password@cluster0.ne8hncq.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise
mongoose.connect(mongoUrl)
mongoose.connection.on('Error', (error: Error) => console.log(error))
app.use('/', router())