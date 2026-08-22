const orderModel = require('../models/orderModels')

const createOrderController = async(req,res) =>{
    try{
        await orderModel.createOrder(req.body);
        res.status(201).json({success:true, message: `Order ${req.body.order_id} created successfully`});
    }
    catch(error){
        console.error('Error creating order in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

const editOrderController = async(req,res) =>{
    try{
        await orderModel.editOrder(req.params,req.body);
        res.status(201).json({success:true, message: `Order ${req.params.order_id} edited successfully`});
    }
    catch(error){
        console.error('Error editing order in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

const getOrderController = async(req,res) => {
    try{
        const order= await orderModel.getOrder(req.params);
        res.status(201).json({success:true, order: order.order});
    }
    catch(error) {
        console.error(`Error retrieving order ${req.params.order_id} in controller:`, error);
        res.status(500).json({success:false, message:error.message});
    }
}

const getAllOrdersController = async(req,res) => {
    try{
        const orders= await orderModel.getAllOrders();
        res.status(201).json({success:true, orders: orders.orders});
    }
    catch(error) {
        console.error('Error retrieving orders in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

const deleteOrderController = async(req,res) => {
    try{
        await orderModel.deleteOrder(req.params);
        res.status(201).json({success:true, message: `Order ${req.params.order_id} deleted successfully`});
    }
    catch(error) {
        console.error('Error deleting order in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

module.exports = {
    createOrderController,
    editOrderController,
    getOrderController,
    getAllOrdersController,
    deleteOrderController
}