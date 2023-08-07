import mongoose from 'mongoose'

const ColumnCardSchema = new mongoose.Schema({
    cardMessage: {
        type: String,
        required: true
    },
    cardAuthor: {
        type: String,
        required: true
    },
    cardComments: [{
        type: String,
        required: false
    }]
})

export default mongoose.model('ColumnCard', ColumnCardSchema)