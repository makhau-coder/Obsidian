const restroService = require('../services/restroService');

// ==========================================
// RESTAURANT CONTROLLERS
// ==========================================

const createRestroController = async (req, res) => {
    try {
        const result = await restroService.createRestroService(req.body);
        if (!result.success) return res.status(400).json(result);

        res.status(201).json({ success: true, message: `Restro created successfully`, restro_id: result.restro_id });
    }
    catch (error) {
        console.error('Error creating restro in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const editRestroController = async (req, res) => {
    try {
        const result = await restroService.editRestroService(req.params, req.body);
        if (!result.success) return res.status(400).json(result);

        res.status(200).json({ success: true, message: `Restro ${req.params.restro_id} edited successfully` });
    }
    catch (error) {
        console.error('Error editing restro in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getRestroController = async (req, res) => {
    try {
        const result = await restroService.getRestroService(req.params);
        if (!result.success) return res.status(400).json(result);
        if (!result.restro) return res.status(404).json({ success: false, message: 'Restaurant not found' });

        res.status(200).json({ success: true, restro: result.restro });
    }
    catch (error) {
        console.error(`Error retrieving restro ${req.params.restro_id} in controller:`, error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getAllRestrosController = async (req, res) => {
    try {
        const result = await restroService.getAllRestrosService();
        res.status(200).json({ success: true, restros: result.restros });
    }
    catch (error) {
        console.error('Error retrieving restros in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const deleteRestroController = async (req, res) => {
    try {
        const result = await restroService.deleteRestroService(req.params);
        if (!result.success) return res.status(400).json(result);

        res.status(200).json({ success: true, message: `Restro ${req.params.restro_id} deleted successfully` });
    }
    catch (error) {
        console.error('Error deleting restro in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// ==========================================
// MENU ITEM CONTROLLERS
// ==========================================

const createMenuItemController = async (req, res) => {
    try {
        const result = await restroService.createMenuItemService(req.body);
        if (!result.success) return res.status(400).json(result);

        res.status(201).json({ success: true, message: `Menu item ${result.item_id} created successfully`, item_id: result.item_id });
    }
    catch (error) {
        console.error('Error creating menu item in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const editMenuItemController = async (req, res) => {
    try {
        const result = await restroService.editMenuItemService(req.params, req.body);
        if (!result.success) return res.status(400).json(result);

        res.status(200).json({ success: true, message: `Menu item ${req.params.item_id} edited successfully` });
    }
    catch (error) {
        console.error('Error editing menu item in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getMenuItemController = async (req, res) => {
    try {
        const result = await restroService.getMenuItemService(req.params);
        if (!result.success) return res.status(400).json(result);
        if (!result.menuItem) return res.status(404).json({ success: false, message: 'Menu item not found' });

        res.status(200).json({ success: true, menuItem: result.menuItem });
    }
    catch (error) {
        console.error(`Error retrieving menu item ${req.params.item_id} in controller:`, error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getAllMenuItemsController = async (req, res) => {
    try {
        const result = await restroService.getAllMenuItemsService(req.params);
        if (!result.success) return res.status(400).json(result);

        res.status(200).json({ success: true, menuItems: result.menuItems });
    }
    catch (error) {
        console.error('Error retrieving menu items in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const deleteMenuItemController = async (req, res) => {
    try {
        const result = await restroService.deleteMenuItemService(req.params);
        if (!result.success) return res.status(400).json(result);

        res.status(200).json({ success: true, message: `Menu item ${req.params.item_id} deleted successfully` });
    }
    catch (error) {
        console.error('Error deleting menu item in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
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