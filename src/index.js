import express from 'express'
import mongoose from 'mongoose'
import registrationValidator from './validations/auth.js'
import * as Controller from './controllers/userController.js'
import cors from 'cors'

const app = express();
app.listen(4444, err => {
    err ? console.log('Server error') : console.log('Connected!');
});
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://jack_claims:Dummy123@cluster0.zvmxo3n.mongodb.net/users?retryWrites=true&w=majority').then(() => {
    console.log('DB connected!')
}).catch(err => {
    console.log(err)
});

app.get('/', (req, res) => {
    res.send('Server runs at the port: 4444')
});

app.post('/auth/register', registrationValidator, Controller.register);

app.post('/auth/login', Controller.login);
