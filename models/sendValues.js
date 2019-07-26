const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SendValues = new Schema({
    name: {
        type: String,
        required: true
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: "Store",
        required: true,
    },
    copyP: {
        type: Number,
        required: false
    },
    copyL: {
        type: Number,
        required: false
    },
    printP: {
        type: Number,
        required: false
    },
    printL: {
        type: Number,
        required: false
    },
    laserC: {
        type: Number,
        required: false
    },
    jetC: {
        type: Number,
        required: false
    },
    plotter: {
        type: Number,
        required: false
    },
    products: {
        type: Number,
        required: false
    },
    internet: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        default: new Date()
    },
    obs: {
        type: String
    },
    data: {
        type: Number
    }
})
const Values = mongoose.model("Values", SendValues)

module.exports = Values