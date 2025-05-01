import express from 'express'
import cors from 'cors'

//Routes to handle more easy the code
import weatherRoutes from './routes/weather.routes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

app.use(weatherRoutes)

app.listen(PORT, () => {
    console.log(`Server working properly and running on port ${PORT}...`);
});
