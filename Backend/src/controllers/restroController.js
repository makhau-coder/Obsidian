const restroService = require('../services/restroService');

// ==========================================
// RESTAURANT CONTROLLERS
// ==========================================

const createRestroController = async (req, res) => {
    try {
        const restro = await restroService.createRestroService(req.body);
        res.status(201).json({ success: true, message: `Restro created successfully`, restro_id: restro.restro_id });
    }
    catch (error) {
        console.error('Error creating restro in controller:', error);
        next(error);
    }
}

const editRestroController = async (req, res) => {
    try {
        const restro = await restroService.editRestroService(req.params, req.body);
        res.status(200).json({ success: true, message: `Restro ${req.params.restro_id} edited successfully`, restro:restro });
    }
    catch (error) {
        console.error('Error editing restro in controller:', error);
        next(error);
    }
}

const getRestroController = async (req, res) => {
    try {
        const restro = await restroService.getRestroService(req.params);
        if (!restro) return res.status(404).json({ success: false, message: 'Restaurant not found' });
        res.status(200).json({ success: true, restro: restro });
    }
    catch (error) {
        console.error(`Error retrieving restro ${req.params.restro_id} in controller:`, error);
        next(error);
    }
}

const getAllRestrosController = async (req, res) => {
    try {
        const restros = await restroService.getAllRestrosService();
        res.status(200).json({ success: true, restros: restros });
    }
    catch (error) {
        console.error('Error retrieving restros in controller:', error);
        next(error);
    }
}

const deleteRestroController = async (req, res) => {
    try {
        const restro = await restroService.deleteRestroService(req.params);
        res.status(200).json({ success: true, message: `Restro ${req.params.restro_id} deleted successfully`, restro:restro });
    }
    catch (error) {
        console.error('Error deleting restro in controller:', error);
        next(error);
    }
}

// ==========================================
// MENU ITEM CONTROLLERS
// ==========================================

const createMenuItemController = async (req, res) => {
    try {
        const menuItem = await restroService.createMenuItemService(req.body);
        res.status(201).json({ success: true, message: `Menu item ${menuItem.item_id} created successfully`, menuItem:menuItem });
    }
    catch (error) {
        console.error('Error creating menu item in controller:', error);
        next(error);
    }
}

const editMenuItemController = async (req, res) => {
    try {
        const menuItem = await restroService.editMenuItemService(req.params, req.body);
        res.status(200).json({ success: true, message: `Menu item ${req.params.item_id} edited successfully`, menuItem:menuItem });
    }
    catch (error) {
        console.error('Error editing menu item in controller:', error);
        next(error);
    }
}

const getMenuItemController = async (req, res) => {
    try {
        const menuItem = await restroService.getMenuItemService(req.params);
        if (!menuItem) return res.status(404).json({ success: false, message: 'Menu item not found' });
        res.status(200).json({ success: true, menuItem: menuItem });
    }
    catch (error) {
        console.error(`Error retrieving menu item ${req.params.item_id} in controller:`, error);
        next(error);
    }
}

const getAllMenuItemsController = async (req, res) => {
    try {
        const menuItems = await restroService.getAllMenuItemsService(req.params);
        res.status(200).json({ success: true, menuItems: menuItems });
    }
    catch (error) {
        console.error('Error retrieving menu items in controller:', error);
        next(error);
    }
}

const deleteMenuItemController = async (req, res) => {
    try {
        const menuItem = await restroService.deleteMenuItemService(req.params);
        res.status(200).json({ success: true, message: `Menu item ${req.params.item_id} deleted successfully`, menuItem:menuItem });
    }
    catch (error) {
        console.error('Error deleting menu item in controller:', error);
        next(error);
    }
}

module.exports = {
    createRestroController,
    editRestroController,
    getRestroController,
    getAllRestrosController,
    deleteRestroController,
    createMenuItemController,
    editMenuItemController,
    getMenuItemController,
    getAllMenuItemsController,
    deleteMenuItemController
}