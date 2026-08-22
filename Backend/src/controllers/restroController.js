const restroModel = require('../models/restroModels')

// ==========================================
// RESTAURANT CONTROLLERS
// ==========================================

const createRestroController = async(req,res) =>{
    try{
        await restroModel.createRestro(req.body);
        res.status(201).json({success:true, message: `Restro created successfully`});
    }
    catch(error){
        console.error('Error creating restro in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

const editRestroController = async(req,res) =>{
    try{
        await restroModel.editRestro(req.params,req.body);
        res.status(201).json({success:true, message: `Restro ${req.params.restro_id} edited successfully`});
    }
    catch(error){
        console.error('Error editing restro in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

const getRestroController = async(req,res) => {
    try{
        const restro= await restroModel.getRestro(req.params);
        res.status(201).json({success:true, restro: restro.restro});
    }
    catch(error) {
        console.error(`Error retrieving restro ${req.params.restro_id} in controller:`, error);
        res.status(500).json({success:false, message:error.message});
    }
}

const getAllRestrosController = async(req,res) => {
    try{
        const restros= await restroModel.getAllRestros();
        res.status(201).json({success:true, restros: restros.restros});
    }
    catch(error) {
        console.error('Error retrieving restros in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

const deleteRestroController = async(req,res) => {
    try{
        await restroModel.deleteRestro(req.params);
        res.status(201).json({success:true, message: `Restro ${req.params.restro_id} deleted successfully`});
    }
    catch(error) {
        console.error('Error deleting restro in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

// ==========================================
// MENU ITEM CONTROLLERS
// ==========================================

const createMenuItemController = async(req,res) =>{
    try{
        await restroModel.createMenuItem(req.body);
        res.status(201).json({success:true, message: `Menu item created successfully`});
    }
    catch(error){
        console.error('Error creating menu item in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

const editMenuItemController = async(req,res) =>{
    try{
        await restroModel.editMenuItem(req.params,req.body);
        res.status(201).json({success:true, message: `Menu item ${req.params.item_id} edited successfully`});
    }
    catch(error){
        console.error('Error editing menu item in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

const getMenuItemController = async(req,res) => {
    try{
        const menuItem = await restroModel.getMenuItem(req.params);
        res.status(201).json({success:true, menuItem: menuItem.menuItem});
    }
    catch(error) {
        console.error(`Error retrieving menu item ${req.params.item_id} in controller:`, error);
        res.status(500).json({success:false, message:error.message});
    }
}

const getAllMenuItemsController = async(req,res) => {
    try{
        // Expects restro_id to fetch the menu for a specific restaurant
        const menuItems = await restroModel.getAllMenuItems(req.params);
        res.status(201).json({success:true, menuItems: menuItems.menuItems});
    }
    catch(error) {
        console.error('Error retrieving menu items in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

const deleteMenuItemController = async(req,res) => {
    try{
        await restroModel.deleteMenuItem(req.params);
        res.status(201).json({success:true, message: `Menu item ${req.params.item_id} deleted successfully`});
    }
    catch(error) {
        console.error('Error deleting menu item in controller:', error);
        res.status(500).json({success:false, message:error.message});
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