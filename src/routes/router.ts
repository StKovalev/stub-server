import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.status(200)
    res.send(`
        <h1>Корень stub-сервиса</h1>
    `)
})

export default router