const home = async ({ Employees },req, res) => {
  const employees = await Employees.find()
  res.render('restrict/employees/employee', {employees})
}
const createEmployeeForm = (req, res) => {
  res.render('restrict/employees/createEmployee')
}

const createEmployee = async ({Employees}, req,res) => {
  const employee = new Employees (req.body)
  await employee.save().then(() => {
    res.redirect('/restrict/funcionarias')
  }).catch((err) => {
    if(err){console.log('Erro ao cadastrar funcionária: ', err)}
  })
}

const excluir = async ({Employees}, req, res) => {
  await Employees.deleteOne({_id: req.params.id}).then(() =>{
      res.redirect('/restrict/funcionarias')
    }).catch((err) => {
    if(err) {'Erro ao excluir funcionária', err}
  })
}

const editForm = async ({ Employees}, req, res) =>{
  const employees = await Employees.findOne({ _id: req.params.id })
    res.render('restrict/employees/editar', {employees})
}


const processEdit = async ({ Employees }, req, res ) => {
  const employees = await Employees.findOneAndUpdate({_id: req.params.id}, {
    name: req.body.name
  }) 
    employees.name = req.body.name
  
   res.redirect('/restrict/funcionarias')
}

module.exports = {
  home, createEmployeeForm, createEmployee, excluir, editForm, processEdit
}