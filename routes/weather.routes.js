import { Router } from 'express'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.get('/', async (req, res) => {

    const q = req.query.q || 'mexico'; //Expecting a 'q' city name in the query

    try {
        const response = await axios.get(`${process.env.BASE_URL}?key=${process.env.API_KEY}&q=${q}&days=7`)
        res.json(response.data)
    } catch (error) {
        res.status(500).json({message: `Unexpected error, we can't show the data right now.`})
    }
})

export default router;
