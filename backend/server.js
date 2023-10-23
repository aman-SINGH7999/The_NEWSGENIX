const express = require('express')
const cors = require('cors')
const app = express();
app.use(cors())
const dotenv = require('dotenv')
dotenv.config();
const connectDB = require('./db')
connectDB();

const userRoute = require('./routes/userRoute')
const newsRoute = require('./routes/newsRoute')
const dataRouet = require('./routes/dataRoute')
// to accept json data
app.use(express.json()); 


app.use('/admin',userRoute);
app.use('/admin',newsRoute);
app.use('/api',dataRouet);


const PORT = process.env.PORT
app.listen(PORT || 5540,()=>{
    console.log(`Server is listning at port = ${PORT}`);
})