const express = require('express');
const router = new express.Router();

const booksController = require('../controllers/books');

router.get('/books', booksController.getAll);

router.get('/books/:id', booksController.getSingle);

router.post('/books/new', booksController.createBook);

router.put('/books/:id',booksController.updateBook);

router.delete('/books/:id', booksController.deleteBook);

module.exports = router;