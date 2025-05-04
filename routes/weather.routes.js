import { Router } from 'express'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.get('/', async (req, res) => {

    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress; //get the public adress
    
    //send the address to ipInfo api to get the city name of the current location
    const geoRes = await axios.get(`https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`); 
    const q = geoRes.data.city //send the city name as a query to weather api

    try {
        const response = await axios.get(`${process.env.BASE_URL}?key=${process.env.API_KEY}&q=${q}&days=7`)
        res.json(response.data)
    } catch (error) {
        res.status(500).json({message: `Unexpected error, we can't show the data right now.`})
    }
})

export default router;
