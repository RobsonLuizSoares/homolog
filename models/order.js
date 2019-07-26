const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema


const OrderSchema =  new Schema({
    name: {
        type: String
    },
    client: {
        type: String,
    },
    store: {
        type: Schema.Types.ObjectId,
        ref:"Store",
        required: true,
    },
    phone:{
        type: String,
    },
    socialMedia: {
        type: String,
    },
    copy: {
        type: String,
    },
    copyQ: {
        type: Number,
    },
    sheets: {
        type: String,
    },
    size: {
        type: String,
    },
    otherServices: {
        type: String,
    },
    color: {
        type: String,
    },
    register: {
        type: Date,
        default: new Date()
    },
    delivery: {
        type: Date,
        default: Date.now()
    },
    valueJobTotal: {
        type: Number,
    },
    valueJobInit:  {
        type: Number,
    },
    isSold:  {
        type: String,
    },
    box:  {
        type: String,
    },
    number: {
        type: Number,
    },
    status: {
        type: String,
        enumValue: [ 'aberta', 'executando','fechada']
    },
    comments:  {
        type: String
    },   
})
OrderSchema.plugin(AutoIncrement, {id: 'order_seq', inc_field: 'number', collection_name: 'numOs'})


const Order = mongoose.model('Order', OrderSchema)
//Resetar Sequência de Comandas
/* Order.counterReset('order_seq', function(err) {
    if(err) { console.log('erro ao resetar a sequencia ', err)}
}) */

module.exports = Order