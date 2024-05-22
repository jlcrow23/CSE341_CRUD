const mongodb = require('../db/database.js');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Books']
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('collection')
        .find();
    result.toArray().then((collection) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(collection);
    });
};

// GET
const getSingle = async (req, res) => {
    //#swagger.tags=['Books']
    if (ObjectId.isValid(req.params.id)) {
        const bookId = ObjectId.createFromTime(req.params.id);
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('collection')
            .find({_id: bookId});
        try {
            result.toArray().then((collection) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(collection[0]);
            });   
        } catch (err) {
            res.status(400).json({ message: err });
        } 
    } else {
        res.status(400).json("Invalid ID entered. Please try again.");
    }  
};

// POST
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
    try {
        const response = await mongodb
            .getDatabase()
            .db()
            .collection('collection')
            .insertOne(book);
        if (response.acknowledged) {
            console.log(response.ObjectId)
            res.status(201).json(response);
        }
    } catch (error) {
        res
            .status(500)
            .json(response.error || 'Some error occured while adding the book.')
    }    
};

// PUT
const updateBook = async (req, res) => {
    //#swagger.tags=['Books']
    if (ObjectId.isValid(req.params.id)) {
        const bookId = ObjectId.createFromTime(req.params.id);
        const book = {
            title: req.body.title,
            authorFirstName: req.body.authorFirstName,
            authorLastName: req.body.authorLastName,
            publishDate: req.body.publishDate,
            pages: req.body.pages,
            age: req.body.age,
            rating: req.body.rating,
            genre: req.body.genre
        }
        try {
            const response = await mongodb
                .getDatabase()
                .db()
                .collection('collection')
                .replaceOne({ _id: bookId }, book);

            if (response.modifiedCount > 0) {
                res.status(201).send();
            } 
        } catch (error) {
            res
                .status(500)
                .json(response.error || 'Some error occured while updating the book.')
        }
    }
};

const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    if (ObjectId.isValid(req.params.id)) {
        try {
            const bookId = ObjectId.createFromTime(req.params.id);
            const response = await mongodb
                .getDatabase()
                .db()
                .collection('collection')
                .deleteOne({ _id: bookId });
            if (response.deletedCount > 0) {
                res.status(204).send();
            } else {
                res.status(500).json(response.error || 'Some error occured while deleting the book.')
            }
        } catch (error) {
            res
                .status(500)
                .json(response.error || "An error occured while attempting to delete the book.")
        }
    }
};

module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
};