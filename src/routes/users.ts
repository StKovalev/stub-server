import { Role } from '../model/roles'
import { Router } from 'express'
import _ from 'lodash'
import pbkdf2password from 'pbkdf2-password'

const router = Router()
const hash = pbkdf2password()

const users: any[] = []

router.post('/user', (req, res) => {
    const { login, password } = req.body

    hash({password}, (err, pass, salt, hash) => {
        if (err) throw err

        const newUser = { id:_.uniqueId(), login, password, salt, role:Role.USER }

        users.push(newUser)

        res.send(newUser)
    })
})

router.post('/login',  (req, res, next) => {
    const { login, password } = req.body

    const user = users.find((u) => u.login === login)

    if(user) {
        hash({password, salt: user.salt}, (err, pass, salt, hash) => {
            const allHash = {
                saveHash: user.salt,
                inputHash: hash
            }
            res.send(allHash)


            // if (err) throw err

            // if(hash === user.hash) {
            //     const { salt, hash, ...rest} = user
                
            //     res.status(200)
            //     res.send(rest)
            // } else {
            //     next(new Error('Неверный пароль пользователя'))
            // }
        }) 
    } else {
        throw new Error('Пользователь с данным логином не найден')
    }
})

export default router
