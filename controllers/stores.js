const home = async ({ Store },req, res) => {
  const stores = await Store.find()
  res.render('restrict/store/stores', {stores})
}
const createStoreForm = (req, res) => {
  res.render('restrict/store/create')
}

const createStore = async ({Store}, req,res) => {
  const store = new Store (req.body)
  await store.save().then(() => {
    res.redirect('stores')
  }).catch((err) => {
    if(err){console.log('Erro ao cadastrar Loja: ', err)}
  })
}

module.exports = {
  home, createStoreForm, createStore
}