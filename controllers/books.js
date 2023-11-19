const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Books']
    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('books').find();
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });
};

const getByUserId = async (req, res) => {
    //#swagger.tags = ['Books']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('books').find({ user_id: userId });
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });
};

const getById = async (req, res) => {
    //#swagger.tags = ['Books']
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('books').find({ _id: bookId });
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books[0]);
    });
};

const createBook = async (req, res) => {
    //#swagger.tags = ['Books']
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        publication_date: req.body.publication_date,
        purchase_date: req.body.purchase_date,
        read: req.body.read,
        rating: req.body.rating,
        user_id: req.body.user_id
    };
    const response = await mongodb.getDatabase().db(process.env.DB_NAME).collection('books').insertOne(book);
    if(response.acknowledged) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the book');
    }
};

const updateBook = async (req, res) => {
    //#swagger.tags = ['Books']
    const bookId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        publication_date: req.body.publication_date,
        purchase_date: req.body.purchase_date,
        read: req.body.read,
        rating: req.body.rating,
        user_id: req.body.user_id
    };
    const response = await mongodb.getDatabase().db(process.env.DB_NAME).collection('books').replaceOne({ _id: bookId }, book);
    if(response.modifiedCount > 0) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the book');
    }
};

const deleteBook = async (req, res) => {
    //#swagger.tags = ['Books']
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db(process.env.DB_NAME).collection('books').deleteOne({ _id: bookId });
    if(response.deletedCount > 0) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the book');
    }
};

module.exports = {
    getAll,
    getByUserId,
    getById,
    createBook,
    updateBook,
    deleteBook
};