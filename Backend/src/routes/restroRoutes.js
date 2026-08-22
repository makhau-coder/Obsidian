const express = require('express');
const restroRouter = express.Router();
const restroController = require('../controllers/restroController');

restroRouter.get('/',(req,res)=>{
    res.send('Restro and Menu service is running')
})

// Restaurant Routes
restroRouter.post('/createRestro', restroController.createRestroController)
restroRouter.put('/editRestro/:restro_id', restroController.editRestroController)
restroRouter.get('/getRestro/:restro_id', restroController.getRestroController)
restroRouter.get('/getAllRestros', restroController.getAllRestrosController)
restroRouter.delete('/deleteRestro/:restro_id', restroController.deleteRestroController)

// Menu Item Routes
restroRouter.post('/createMenuItem', restroController.createMenuItemController)
restroRouter.put('/editMenuItem/:item_id', restroController.editMenuItemController)
restroRouter.get('/getMenuItem/:item_id', restroController.getMenuItemController)
restroRouter.get('/getAllMenuItems/:restro_id', restroController.getAllMenuItemsController)
restroRouter.delete('/deleteMenuItem/:item_id', restroController.deleteMenuItemController)

module.exports = restroRouter;