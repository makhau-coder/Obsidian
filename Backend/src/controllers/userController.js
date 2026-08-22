const userModel = require('../models/userModels')

const createUserController = async(req,res) =>{
    try{
        await userModel.createUser(req.body);
        res.status(201).json({success:true, message: `User ${req.body.user_id} created successfully`});
    }
    catch(error){
        console.error('Error creating user in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

const editUserController = async(req,res) =>{
    try{
        await userModel.editUser(req.params,req.body);
        res.status(201).json({success:true, message: `User ${req.params.user_id} edited successfully`});
    }
    catch(error){
        console.error('Error editing user in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

const getUserController = async(req,res) => {
    try{
        const user= await userModel.getUser(req.params);
        res.status(201).json({success:true, user: user.user});
    }
    catch(error) {
        console.error(`Error retrieving user ${req.params.user_id} in controller:`, error);
        res.status(500).json({success:false, message:error.message});
    }
}

const getAllUsersController = async(req,res) => {
    try{
        const users= await userModel.getAllUsers();
        res.status(201).json({success:true, users: users.users});
    }
    catch(error) {
        console.error('Error retrieving user in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

const deleteUserController = async(req,res) => {
    try{
        await userModel.deleteUser(req.params);
        res.status(201).json({success:true, message: `User ${req.params.user_id} deleted successfully`});
    }
    catch(error) {
        console.error('Error deleting user in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

module.exports = {
    createUserController,
    editUserController,
    getUserController,
    getAllUsersController,
    deleteUserController
}