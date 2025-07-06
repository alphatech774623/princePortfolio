
import { configDotenv } from 'dotenv'
configDotenv({path : './.env'})
import express from 'express'
import { connectDB } from './config/db.js';
import routes from './routes/routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const port = process.env.PORT;
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL, // Replace with your frontend URL
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use('/api',routes)

app.get('/',(req,res)=>{
  res.send('hello')
})

app.listen(3000,()=>{
    connectDB()
    console.log(`app is running on port ${port}`)
}) 