const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StoreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    
})

const Store = mongoose.model("Store", StoreSchema)

module.exports = Store