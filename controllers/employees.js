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

module.exports = {
  home, createEmployeeForm, createEmployee
}