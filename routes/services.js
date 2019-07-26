const express = require('express')
const router = express.Router()
const servicesController = require('../controllers/services')


const Order = require('../models/order')
const Employees = require('../models/employees')
const Store = require('../models/stores')

const models = {
    Order, Employees, Store
}

router.get('/list', servicesController.list.bind(null, models))
//router.get('/lojas', servicesController.resultsStore.bind(null, models))

//router.get('/list/:name', servicesController.storeOs.bind(null, models))

router.get('/nova', servicesController.newFormOs.bind(null, models))
router.post('/nova', servicesController.createOs.bind(null, models))

//router.get('/lojas', servicesController.storeOs.bind(null, models))

router.get('/excluir/:id' , servicesController.excluirOs.bind(null, models))

router.post('/editar/:id', servicesController.editOs.bind(null, models))
router.get('/editar/:id', servicesController.editFormOs.bind(null, models))
router.get('/info/:id', servicesController.info.bind(null, models))
router.post('/info/:id', servicesController.addComentario.bind(null, models))

/* router.get('/buscar/fechada', servicesController.searchOsF.bind(null, models))
router.get('/buscar/aberta', servicesController.searchOsA.bind(null, models))
router.get('/buscar/executando', servicesController.searchOsE.bind(null, models)) */

router.get('/list/:name', servicesController.resultsStore.bind(null, models))

router.get('/buscar/fechada/:name', servicesController.storeOsF.bind(null, models))
router.get('/buscar/aberta/:name', servicesController.storeOsA.bind(null, models))
router.get('/buscar/executando/:name', servicesController.storeOsE.bind(null, models))


module.exports = router