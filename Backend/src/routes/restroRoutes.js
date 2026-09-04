const express = require('express');
const restroRouter = express.Router();
const restroController = require('../controllers/restroController');
const authMiddleware = require('../auth/authMiddleware')

restroRouter.use(express.json());

restroRouter.get('/', (req, res) => {
    res.send('Restro and Menu service is running')
})

// Restaurant Routes
restroRouter.post('/createRestro', authMiddleware.authMiddleware, restroController.createRestroController)
restroRouter.put('/editRestro/:restro_id', authMiddleware.authMiddleware, restroController.editRestroController)
restroRouter.get('/getRestro/:restro_id', authMiddleware.authMiddleware, restroController.getRestroController)
restroRouter.get('/getAllRestros', authMiddleware.authMiddleware, restroController.getAllRestrosController)
restroRouter.delete('/deleteRestro/:restro_id', authMiddleware.authMiddleware, restroController.deleteRestroController)

// Menu Item Routes
restroRouter.post('/createMenuItem', authMiddleware.authMiddleware, restroController.createMenuItemController)
restroRouter.put('/editMenuItem/:item_id', authMiddleware.authMiddleware, restroController.editMenuItemController)
restroRouter.get('/getMenuItem/:item_id', authMiddleware.authMiddleware, restroController.getMenuItemController)
restroRouter.get('/getAllMenuItems/:restro_id', authMiddleware.authMiddleware, restroController.getAllMenuItemsController)
restroRouter.delete('/deleteMenuItem/:item_id', authMiddleware.authMiddleware, restroController.deleteMenuItemController)

module.exports = restroRouter;