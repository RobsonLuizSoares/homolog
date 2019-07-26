
const moment = require('moment')
moment.locale('pt-br')

const labels = [ 
  { id: 'aberta', name: 'aberta' }, 
  { id: 'executando', name: 'executando' },
  { id: 'fechada', name: 'fechada' }
]

const copies = [
  { id: 'Colorida Jato', name: 'Colorida Jato' },
  { id: 'Colorida Laser', name: 'Colorida Laser' },
  { id: 'Preto e Branco', name: 'Preto e Branco' }
]
const sheets = [
  { id: 'Frente', name: 'Frente' },
  { id: 'Frente e Verso', name: 'Frente e Verso' },
]
const services = [
  { id: 'Encadernar', name: 'Encadernar' },
  { id: 'Plastificar', name: 'Plastificar' },
  { id: 'Outro Serviço', name: 'Outro Serviço' }
]
const sizes = [
  { id: 'Normal', name: 'Normal' },
  { id: 'Reduzido', name: 'Reduzido' },
  { id: 'Ampliado', name: 'Ampliado' }
]
const colors = [
  { id: 'Incolor', name: 'Incolor' },
  { id: 'Fumê', name: 'Fumê' },
  { id: 'Preto', name: 'Preto' }
]
const solds = [
  { id: 'Tudo Pago!', name: 'Tudo Pago!' },
  { id: 'Parcial', name: 'Parcial' },
  { id: 'Não Pago', name: 'Não Pago' }
]


const list = async ({ Order, Store }, req, res) => {
  const store = await Store.find({})
  const order = await Order.find({}).sort({number: -1})
      res.render('os/comandas', {order, labels, services, copies, sheets, sizes, colors, solds, store, moment })    
}
/* const list = async ({ Order, Store, Employees }, req, res) => {
  const employees = await Employees.find()
  const order = await Store.find().then((store) => {
    if(Store) {
      Order.find({store: store._id}).then((Order) => {
        res.render('os/comandas', { Order, store, employees, moment } )
      }).catch(() => {
        console.log('Erro ao listar todas as Comandas')
      })
    }else {
      console.log('Erro ao listar comandas em geral')
    }
  }).catch((err) => {
    if(err) {
      console.log('erro ao listar ', err)
    }
  })
      
} */

const newFormOs = async ({Store, Employees}, req, res) =>{
  const employees = await Employees.find()
  const stores = await Store.find()
  res.render('os/nova', {stores, employees})
}


const createOs = async ({ Order }, req, res ) => {
  const order = new Order (req.body)
  await order
    .save()
    .then(() => {
      if(req.body.store === '5d0b1c49fd60670017b2d3fc') {
        res.redirect('/os/list/Unespar')
      }else if(req.body.store === '5d0b1c23fd60670017b2d3fb') {
        res.redirect('/os/list/Avenida')
      }else if(req.body.store === '5d0b1c72fd60670017b2d3fd') {
        res.redirect('/os/list/São%20Cristóvão')
      }else if(req.body.store === '5d0b1c87fd60670017b2d3fe') {
        res.redirect('/os/list/Cruz%20Machado')
      }
  }).catch((err) => {
      if(err){console.log('erro no create: ',err)}
  })     
}
//========================BUSCA DE COMANDAS POR LOJAS ========================================================
const storeOsF = async ({Order, Store, Employees}, req, res) =>{
  const employees= await Employees.find()
  const order = await Store.findOne({name: req.params.name}).then((store) => {
    if(Store) {
      Order.find({store: store._id, status: { $all: 'fechada'} } ).sort({date: -1}).then((Order) => {
        res.render('os/resultsOS', { Order, store, employees, moment })
      }).catch(() => {
        console.log('Erro ao listar as comandas por loja')
      })
    }else {
      console.log('Não existe comanda nessa loja')
    }
  }).catch((err) => {
    if(err) {
      console.log('Deu erro ao listar comandas por loja ', err)
    }
  })
}

const storeOsA = async ({Order, Store, Employees}, req, res) =>{
  const employees= await Employees.find()
  const order = await Store.findOne({name: req.params.name}).then((store) => {
    if(Store) {
      Order.find({store: store._id, status: { $all: 'aberta'} } ).sort({date: -1}).then((Order) => {
        res.render('os/resultsOS', { Order, store, employees, moment })
      }).catch(() => {
        console.log('Erro ao listar as comandas por loja')
      })
    }else {
      console.log('Não existe comanda nessa loja')
    }
  }).catch((err) => {
    if(err) {
      console.log('Deu erro ao listar comandas por loja ', err)
    }
  })
}

const storeOsE = async ({Order, Store, Employees}, req, res) =>{
  const employees= await Employees.find()
  const order = await Store.findOne({name: req.params.name}).then((store) => {
    if(Store) {
      Order.find({store: store._id, status: { $all: 'executando'} } ).sort({date: -1}).then((Order) => {
        res.render('os/resultsOS', { Order, store, employees, moment })
      }).catch(() => {
        console.log('Erro ao listar as comandas por loja')
      })
    }else {
      console.log('Não existe comanda nessa loja')
    }
  }).catch((err) => {
    if(err) {
      console.log('Deu erro ao listar comandas por loja ', err)
    }
  })
}

/* const searchOsF = async ({ Order }, req, res) => {
  const order = await Order.find({ status: { $all: 'fechada'} })
    res.render('os/comandas', { order, labels, services, copies, sheets, sizes, colors, solds, moment})
} */

// ===============================================================================
/* const resultsStore =  async({Order, Store, Employees},req, res) => {
  const order = await Order.find()
  const store = await Store.find()
  res.render('os/lojas', { order, store } )
} */

const resultsStore =  async({Order, Store, Employees},req, res) => {
  const order = await Order.find()
  const employees = await Employees.find()
  const store = await Store.findOne({name:req.params.name}).then((store) =>{
    if(Store) {
      Order.find({store:store._id}).then((order) => {
         res.render('os/lojas', { order, store, employees, moment } )
      }).catch(() =>{
        console.log('erro ao listar comandas por loja específica ', err)
      })
    }else {
      console.log('essa comanda não existe')
    }
  }).catch((err) => {
      if(err) { 
      console.log('erro ao listar comandas por loja específica ', err)
      }
  })
 
}

const excluirOs = async ({ Order }, req, res) => {
  await Order.deleteOne({ _id: req.params.id })
    res.redirect('/os/list')
}

const editOs = async ({ Order }, req, res) => {
  const order = await Order.findOneAndUpdate( { _id: req.params.id }, {
    client: req.body.client,
    phone: req.body.phone,
    socialMedia: req.body.socialMedia,
    copy: req.body.copy,
    copyQ: req.body.copyQ,
    sheets: req.body.sheets, sizes,
    size: req.body.size,
    otherServices: req.body.otherServices,
    color: req.body.color,
    delivery: req.body.delivery,
    valueJobTotal: req.body.valueJobTotal,
    valueJobInit: req.body.valueJobInit,
    isSold: req.body.isSold,
    //number: req.body.number,
    status: req.body.status,
    comments: req.body.comments
  })
    order.client= req.body.client
    order.phone= req.body.phone
    order.socialMedia= req.body.socialMedia
    order.copy= req.body.copy
    order.copyQ= req.body.copyQ
    order.sheets= req.body.sheets
    order.size= req.body.size
    order.otherServices= req.body.otherServices
    order.color= req.body.color
    order.delivery= req.body.delivery
    order.valueJobTotal= req.body.valueJobTotal
    order.valueJobInit= req.body.valueJobInit
    order.isSold= req.body.isSold
    //order.number= req.body.number
    order.status= req.body.status
    order.comments= req.body.comments
    
    
    
      res.redirect('/os/list')
    
}

const editFormOs = async ({ Order }, req, res) => {
  const order = await Order.findOne({ _id: req.params.id })
     res.render('os/editarOs', { order, labels, services, copies, sheets, sizes, colors, solds, moment } )  
}

const info = async ({ Order }, req, res ) => {
  const order = await Order.findOne({ _id: req.params.id })
  res.render('os/info', { order })
}

const addComentario = async ({Order}, req, res) => {
  await Order.updateOne({ _id: req.params.id }, {$push: {comments: req.body.comentario}})
  res.redirect('/os/info/'+req.params.id)
}
//********************************************************** */
/* const searchOsF = async ({ Order }, req, res) => {
  const order = await Order.find({ status: { $all: 'fechada'} })
    res.render('os/comandas', { order, labels, services, copies, sheets, sizes, colors, solds, moment})
}
//********************************************************** */
/* const searchOsA = async ({ Order }, req, res) => {
  const order = await Order.find({ status: { $all: 'aberta'} })
    res.render('os/comandas', { order, labels, services, copies, sheets, sizes, colors, solds, moment})
}
 */
/* const searchOsE = async ({ Order }, req, res) => {
  const order = await Order.find({ status: { $all: 'executando'} })
    res.render('os/comandas', { order, labels, services, copies, sheets, sizes, colors, solds, moment})
}  */

module.exports = {
    list,
    createOs,
    newFormOs,
    excluirOs,
    editOs,
    editFormOs,
    info,
    addComentario,
    /* searchOsF,
    searchOsA,
    searchOsE, */
    storeOsF,
    storeOsA,
    storeOsE,
    resultsStore
}