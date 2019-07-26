
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema


const ClientSchema = new Schema({ 
    name: {
        type: String,
        required: true
    },
    number_client: {
        type: Number,
        unique: true 
    },
    birthday: {
        type: String,
        
    },
    phone: {
        type: String,
    },
    socialMedia: {
        type: String,
    }, 
    date: {
        type: Date,
        default: new Date()
    } 
    
})
ClientSchema.plugin(AutoIncrement, {id: 'client_seq', inc_field: 'number_client', collection_name: 'clients'})
 
const Client = mongoose.model('Client', ClientSchema)

module.exports= Client