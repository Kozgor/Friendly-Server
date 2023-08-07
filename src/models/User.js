import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false,
        unique: false
    },
    passwordHash: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

export default mongoose.model('User', UserSchema)