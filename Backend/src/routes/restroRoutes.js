const express = require('express');
const restroRouter = express.Router();

restroRouter.get('/',(req,res)=>{
    res.send('Restaurant service is running')
})

module.exports = restroRouter;