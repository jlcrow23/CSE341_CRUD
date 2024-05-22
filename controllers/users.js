const mongodb = require('../db/database.js');
const ObjectId = require('mongodb').ObjectId;
const config = require('config');


const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().db().collection('users2').find();
    result.toArray().then((users2) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users2);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = ObjectId.createFromTime(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users2').find({_id: userId});
    result.toArray().then((users2) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users2[0]);
    });
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        preferedGenre: req.body.preferedGenre        
    };
    const response = await mongodb.getDatabase().db().collection('users2').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while adding the user.')
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = ObjectId.createFromTime(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        userName: req.body.userName,
        email: req.body.email,
        preferedGenre: req.body.preferedGenre 
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user.')
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = ObjectId.createFromTime(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the user.')
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};