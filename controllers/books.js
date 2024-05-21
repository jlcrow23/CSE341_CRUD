const mongodb = require('../db/database.js');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Books']
    const result = await mongodb.getDatabase().db().collection('collection').find();
    result.toArray().then((collection) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(collection);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('collection').find({_id: bookId});
    result.toArray().then((collection) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(collection[0]);
    });
};

const createBook = async (req, res) => {
    //#swagger.tags=['Books']
    const book = {
        title: req.body.title,
        authorFirstName: req.body.authorFirstName,
        authorLastName: req.body.authorLastName,
        publishDate: req.body.publishDate,
        pages: req.body.pages,
        age: req.body.age,
        rating: req.body.rating,
        genre: req.body.genre
    };
    const response = await mongodb.getDatabase().db().collection('collection').insertOne(book);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while adding the book.')
    }
};

const updateBook = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        authorFirstName: req.body.authorFirstName,
        authorLastName: req.body.authorLastName,
        publishDate: req.body.publishDate,
        pages: req.body.pages,
        age: req.body.age,
        rating: req.body.rating,
        genre: req.body.genre
    };
    const response = await mongodb.getDatabase().db().collection('collection').replaceOne({ _id: bookId }, book);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the book.')
    }
};

const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('collection').deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the book.')
    }
};

module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
};