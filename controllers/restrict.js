const moment = require('moment')
moment.locale('pt-br')

const home =  (req, res) => {
    res.render('restrict/home')
}
//Gerenciamento
const management = async ({Order, Store, Employees},req,res) => {
  const orderOpenAvenida = await Order.countDocuments({store: { $all:'5d3b993f26b89933942253a5'} , status: { $all: 'aberta'}})
  const orderExecAvenida = await Order.countDocuments({ store:{ $all:'5d3b993f26b89933942253a5'} , status: { $all: 'executando'}})

  const orderOpenUnespar = await Order.countDocuments({store: { $all:'5d3b994a26b89933942253a6'} , status: { $all: 'aberta'}})
  const orderExecUnespar = await Order.countDocuments({ store:{ $all:'5d3b994a26b89933942253a6'} , status: { $all: 'executando'}})

  const orderOpenSCris = await Order.countDocuments({store: { $all:'5d3b996e26b89933942253a8'} , status: { $all: 'aberta'}})
  const orderExecSCris = await Order.countDocuments({ store:{ $all:'5d3b996e26b89933942253a8'} , status: { $all: 'executando'}})

  const orderOpenCruz = await Order.countDocuments({store: { $all:'5d3b995526b89933942253a7'} , status: { $all: 'aberta'}})
  const orderExecCruz = await Order.countDocuments({ store:{ $all:'5d3b995526b89933942253a7'} , status: { $all: 'executando'}})

  res.render('restrict/gerenciamento', {orderOpenAvenida, orderExecAvenida, orderOpenUnespar, orderExecUnespar, orderOpenSCris, orderExecSCris, orderOpenCruz, orderExecCruz })
}

// USUÁRIOS
const newUser = (req, res) => {
    res.render('restrict/users/newUser')
}

const createUser = async ({ User }, req, res ) => {
    const user = new User (req.body)
    await user.save().then(() => {
      res.redirect('/restrict')
    }).catch((err) => {
        if(err){console.log('erro no create: ',err)}
    })     
  }

const users = async ({User}, req, res) => {
  const users = await User.find()
  res.render('restrict/users/users', { users})
}
  // FUNCIONÁRIAS
  const createEmployees = async ({ Employees }, req, res ) => {
    const employee = new Employees (req.body)
    await employee.save().then(() => {
      res.redirect('/restrict/funcionarias') 
    }).catch((err) => {
        if(err){console.log('erro no create: ',err)}
    })     
  }
// CAIXAS
  const caixas = async ({ Store, Values },req, res) => {
    const quantCaixas = await Values.count()
    const adminCaixas = await Store.find().then((store) => {
      res.render('restrict/receiveCaixas', { store, quantCaixas })
    })
}

/* const listCaixas = async ({ Values, Store, User }, req, res) => {

    const users = await User.find() 
    const caixas = await Values.find().populate("store").sort({date: -1}).then((Values) => { 
      if (Values){ 
         Store.find().then((store) => { 
          res.render("restrict/caixas/caixas", { Values , resultado, store, users, moment } )
        }).catch((err) => {
          console.log('Erro rude: ' + err)
            })
      }else{
        console.log('não existem valores a serem lançados')
        }
    })
  } */

  const storeCaixas = async ({ Values, Store, Employees }, req, res) => {
    
    const employees = await Employees.find() 
    const caixas = await Store.findOne({name: req.params.name}).then((store) => {

      if(Store) {

        Values.find({store:store._id}).sort({date:-1}).then((Values) => {
          res.render('restrict/caixas/results', { Values, store, employees, moment })
        }).catch(() => {
          console.log('Erro ao listar os caixas da loja específica')
        })
      }else{
        console.log('Essa loja não existe')
      }
    }).catch((err) => {
      if(err) {
        console.log('Deu erro ao listar os caixas pela loja ', err)
      }
    })
}

const excluirCaixa = async ({ Values }, req, res) => {
  await Values.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect('/restrict/caixas')
  }).catch((err) => {
    console.log('erro ao deletar caixa, ', err)
  })
}

const countCaixasA = async({ Order, Values }, req, res) => {
  let quantCaixas = await Values.count()
  let quantComandas = await Order.where({'status':{$ne:'fechada'}}).countDocuments()
    .then((quant) => {
    res.render('restrict/counts', { quant, quantCaixas })
  })
}



module.exports = {
    home, newUser, createUser, users, createEmployees, caixas, storeCaixas, management, excluirCaixa, countCaixasA
}