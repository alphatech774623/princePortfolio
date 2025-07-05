
import { configDotenv } from 'dotenv'
configDotenv({path : './.env'})
import express from 'express'
import { connectDB } from './config/db.js';
import routes from './routes/routes.js';
import cookieParser from 'cookie-parser';

const port = process.env.PORT;
const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use('/api',routes)


app.listen(3000,()=>{
    connectDB()
    console.log(`app is running on port ${port}`)
}) 