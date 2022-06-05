const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const TelegramBot = require('node-telegram-bot-api')
const connectDB = require('./config/db')

//Load Config
dotenv.config({ path:'./config/config.env' })

//Passport config
require('./config/passport')(passport)

connectDB()

const token = '5439952548:AAEjg_LW9ZlbM01rr7xJArE69g_G_UrfRQw'

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

//Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI})
  }))

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true})

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
// 'msg' is the received Message from Telegram
// 'match' is the result of executing the regexp above on the text content
// of the message
  
    const chatId = msg.chat.id
    const resp = match[1] // the captured "whatever"
  
// send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp)
  })

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id
// send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message')
  })

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)