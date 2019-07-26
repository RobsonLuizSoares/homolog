const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeesSchema = new Schema({
    name: {
        type: String,
        required: true
    }
    
})

const Employee = mongoose.model("Employees", EmployeesSchema)

module.exports = Employee