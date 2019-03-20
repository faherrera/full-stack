const { Router } = require('express');
const router = Router();
const Book = require('../models/book');

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200)
        .send({
            message: "Devolviendo los datos",
            books
        });
    } catch (error ) {
        res.status(404)
        .send({
            message:"Ocurrió un error",
            error: error.message
        });
    }
});

router.post('/', async (req,res) => {
    const {title,author,isbn} = req.body;
    const imagePath = '/uploads/' + req.file.filename; 
    const newBook = new Book({title,author,isbn,imagePath});
    try {
        await newBook.save();
        res
        .status(200)
        .send({
            message:"El dato guardao",
            data: newBook
        })
    } catch (error) {
        res
        .status(500)
        .send({
            message:"Se hizo verga todo",
            error
        })
    }
    res.status(200).send({
        data: newBook
    });
});

router.delete('/:id', async (req,res) => {
    console.clear();
    const ID = req.params.id;
    try {
        const book = await Book.findByIdAndDelete(ID);
        res.status(200)
        .send({
            message:"Eliminado correctamente",
            book
        })
    } catch (error) {
        res.status(500)
        .send({
            message:"Ocurrió un error al intentar eliminar",
            error
        })
    }
    res.send("Deleting");
});
module.exports = router;