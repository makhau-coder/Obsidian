const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const restroRoutes = require('./routes/restroRoutes');
const userRoutes = require('./routes/userRoutes');
require("dotenv").config();

const app=express();

//***************Middleware Functions***************
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
    })
}

//***************Middlewares***************
app.use(express.json());
app.use(errorHandler);
app.use('/order', orderRoutes);
app.use('/restro', restroRoutes);
app.use('/user', userRoutes);


//***************Server***************
app.listen(process.env.PORT,()=>{
    console.log('Server started on port '+process.env.PORT)
})

app.get('/',(req,res)=>{
    res.send('server is running')
})

app.get('/health',(req,res)=>{
    res.send('server is healthy')
})
