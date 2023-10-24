import express from 'express'
import 'dotenv/config'
import cookieSession from 'cookie-session'
import { router, users } from './routes'

const PORT = process.env.PORT
const COOKIE_SECRET = process.env.COOKIE_SECRET

const app = express()

app.use(cookieSession({ secret: COOKIE_SECRET }))
app.use(express.json())

app.use(router)
app.use(users)

app.get('/error', (req, res) => {
    res.send('Смотрим ошибку %)')
})

app.get('/error2', (req, res, next) => {
    next(new Error('Здесь что-то поломалось...'))
})

app.get('/error3', (req, res, next) => {
    throw new Error('Поломали...!')
})

app.use((err, req, res, next) => {
    res.status(400)
    res.send(`
        <h1>Все сломась!!!</h1>
        <p>${err.message || 'Что-то пошло не так ...'}</p>
    `)
})

app.listen(process.env.PORT, () => {
    console.log(`Сервер запущен http://localhost:${PORT}`)
})