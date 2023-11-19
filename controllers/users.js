const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const collection = 'users';

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(collection).find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getById = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(collection).find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const user = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
    const response = await mongodb.getDatabase().db(process.env.DB_NAME).collection(collection).insert(user);
    if(response.acknowledged) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user');
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
    const response = await mongodb.getDatabase().db(process.env.DB_NAME).collection(collection).replace({ _id: userId }, user);
    if(response.modifiedCount > 0) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db(process.env.DB_NAME).collection(collection).deleteOne({ _id: userId });
    if(response.deletedCount > 0) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user');
    }
};

module.exports = {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser
};