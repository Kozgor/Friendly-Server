import express from 'express'
import mongoose from 'mongoose'
import registrationValidator from './validations/auth.js'
import * as UserController from './controllers/userController.js'
import * as BoardController from './controllers/boardController.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.listen(4444, err => {
    err ? console.log('Server error') : console.log('Connected!')
});
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('DB connected successfuly!')
}).catch(err => {
    console.log(err)
});

app.get('/', (req, res) => {
    res.send('Server runs at the port: 4444')
});

app.post('/auth/register', registrationValidator, UserController.register)

app.post('/auth/login', UserController.login)

app.post('/boards/new-board', BoardController.createBoard)

app.get('/boards/:boardId', BoardController.getBoardById)

// app.post('/boards/board-id/column-id/all-column-cards', Controller.getCards);

// app.post('/boards/board-id/column-id/edit-column-card', Controller.editCard);