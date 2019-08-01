const home = (req, res) => {
  res.render('admin/home')
}

const createCaixa = async ({Store, Employees},req, res) => {
  const employees = await Employees.find() 
  const stores = await Store.find()

    res.render('admin/sendCaixas', { stores, employees })
} 

const sendCaixa = async ({ Values }, req, res) => {
  const caixa = new Values (req.body)
    await caixa
      .save()
      .then(()=> { 
        console.log('Novo Caixa salvo com sucesso') 
          res.redirect("/admin")
      })
      .catch((err)=>{ 
       if (err){console.log('Erro ao salvar o Caixa ' + err)}  
    })   
}



module.exports = {
  home , createCaixa, sendCaixa
}