const express = require('express')
const router = express.Router()
const restrictController = require('../controllers/restrict')
const storeController = require('../controllers/stores')
const employeesController = require('../controllers/employees')
//const caixasController = require('../controllers/caixas')

const User = require('../models/user')
const Values = require('../models/sendValues')
const Store =require('../models/stores')
const Employees = require('../models/employees')
const Order = require('../models/order')

const models = {
    User,
    Values,
    Store,
    Employees,
    Order
}

router.use((req, res, next) => {
    if('user' in req.session){
        if(req.session.user.roles.indexOf('restrict')>=0){
            return next()
        }else{
            res.redirect('/')
        }
    }
   res.redirect('/login')
})

router.get('/', restrictController.home)

router.get('/caixas', restrictController.caixas.bind(null, models))
//router.get('/caixas/list', restrictController.listCaixas.bind(null, models))

router.get('/caixas/:name', restrictController.storeCaixas.bind(null, models))
//////////
router.get('/caixas/excluir/:id', restrictController.excluirCaixa.bind(null, models))
/////////////
router.get('/count', restrictController.countCaixasA.bind(null, models))
///////////
router.get('/gerenciamento', restrictController.management)
// Empregados
router.get('/funcionarias', employeesController.home.bind(null, models))
router.get('/funcionarias/nova', employeesController.createEmployeeForm)
router.post('/funcionarias/nova', employeesController.createEmployee.bind(null, models))

// Usuários do sistema
router.get('/novousuario', restrictController.newUser)
router.post('/novousuario', restrictController.createUser.bind(null, models))
router.get('/users', restrictController.users.bind(null, models))

//Rota Acessar Lojas
router.get('/stores', storeController.home.bind(null, models))
//Rota Acessar Formulário Criar Loja
router.get('/loja/nova', storeController.createStoreForm) 
// Rota para Cadastro de Lojas
router.post('/loja/nova', storeController.createStore.bind(null, models)) 

module.exports = router