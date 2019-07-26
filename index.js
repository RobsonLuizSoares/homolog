const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const db = require('./config/db')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000
const User = require('./models/user')

const loginRouter = require('./routes/auth')
const logoutRouter = require('./routes/logout')
const indexRouter = require('./routes/index')
const adminRouter = require('./routes/admin')
const servicesRouter = require('./routes/services')
const restrictRouter = require('./routes/restrict')



app.use(cookieParser())

const mongoose = require('mongoose')

//Create Initial User

const createInitialUser = async() => {
    const total = await User.countDocuments({ username: 'robly', username: 'lya' })
    if(total===0){
        const user = new User({
            user: 'Robson Luiz',
            username: 'robly',
            password: '1234',
            roles: ['admin', 'restrict']
        })
        await user.save() 

        const user2 = new User({
            user: 'Lya Petry',
            username: 'lya',
            password: '1234',
            roles: ['admin']
        })
        await user2.save()

        const user3 = new User({
            user: 'Chefe Lya',
            username: 'chefe',
            password: '2509',
            roles: ['admin','restrict']
        })
        await user3.save()   

        console.log('Usuário criado com sucesso')
    }else{
        console.log('Não foi necessário criar usuário')
    }
}


mongoose.Promise = global.Promise
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true
}).then(() => { 
    createInitialUser() 
    app.listen(PORT, () => {
        console.log('Server listening on port: ', PORT)
    }) 
    console.log('Conectado ao Mongodb netlinkHomolog...')
}).catch((err) => {
    console.log('Houve um erro ao conectar ao Mongodb: ', err)
})

app.use(session({
    secret: '250916',
    resave: true,
    saveUninitialized: true

}))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middleware Login

// Middleware Login
app.use((req, res, next) => {
    if('user' in req.session){
        res.locals.user = req.session.user
        res.locals.roles = req.session.roles
    }
    next()
})

app.use('/admin', (req,res, next) => {
    if('user' in req.session){
        return next()
    }
    res.redirect('/login')
})
app.use('/os', (req,res, next) => {
    if('user' in req.session){
        return next()
    }
    res.redirect('/login')
})


// Routes
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/', indexRouter)
app.use('/admin', adminRouter)
app.use('/os', servicesRouter)
app.use('/restrict', restrictRouter)



