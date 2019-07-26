const express = require('express')
const router = express.Router()
const caixasController = require('../controllers/caixas')


const Values = require('../models/sendValues')
const Store = require('../models/stores')
const User = require('../models/user')
const Employees = require('../models/employees')


const models = {
    Values,
    Store,
    User,
    Employees
}

router.get('/', (req, res) => {
    res.render('admin/home')
})


//CAIXAS 

router.get('/caixas', caixasController.home) 

 //Rota visualizar o formulário de fechar o caixa

//router.get('/listCaixas', caixasController.newCaixas.bind(null, models))

//Rota criar caixa
router.get('/caixas/nova', caixasController.createCaixa.bind(null, models)) 

//Rota para mandar dados do caixa
router.post('/caixas/nova', caixasController.sendCaixa.bind(null, models)) 



module.exports = router