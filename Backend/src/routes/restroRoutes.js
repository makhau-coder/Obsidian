const express = require('express');
const restroRouter = express.Router();
const restroController = require('../controllers/restroController');


restroRouter.get('/',(req,res)=>{
    res.send('Restro service is running')
})

restroRouter.post('/createRestro', restroController.createRestroController)
restroRouter.put('/editRestro/:restro_id', restroController.editRestroController)
restroRouter.get('/getRestro/:restro_id', restroController.getRestroController)
restroRouter.get('/getAllRestros', restroController.getAllRestrosController)
restroRouter.delete('/deleteRestro/:restro_id', restroController.deleteRestroController)

module.exports = restroRouter;