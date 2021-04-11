import session from 'express-session'
import express from 'express'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import Users from './models/Users.js'
import logger from './controllers/logger.js'

dotenv.config()

const PORT = process.env.PORT ?? 3000
const app = express()

const users = new Users({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.set('view engine', 'ejs')
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(logger)

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home page',
        user: req.session.user
    })
})

app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Sign in'
    })
})

app.post('/login', async (req, res) => {
    try {
        const user = {
            login: req.body.login,
            password: req.body.password
        }

        if (!(await users.login(user))) {
            throw 'failed'
        }

        req.session.user = await users.getData(user.login)
    
        res.status(201).redirect('/')
    } catch {
        res.status(500).redirect('/login')
    }
})

app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Sign up'
    })
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = {
            login: req.body.login,
            email: req.body.email,
            password: hashedPassword
        }

        if (!(await users.register(user))) {
            throw 'failed'
        }

        res.status(201).redirect('/login')
    } catch {
        res.status(500).redirect('/register')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/');
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
