import express from 'express';
import {Book} from "../models/bookModel.js";

const router = express.Router();
//Route for save new book

router.post('/' , async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).json({
                status:'fail',
                message:"Send all required fields: title, author, publishYear"
            });
        }
        const newbook = {
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        };
        const book = await Book.create(newbook)
        return res.status(201).json({
            status:"sucess",
            data:book
        })
    } catch(err){
        console.log(err);
        res.status(500).send({message:err.message})
    }
})

//Route for gett all Books

router.get('/', async (req , res) =>{
    try{
        const books = await Book.find({});
        return res.status(200).json({
            status:'success',
            count:books.length,
            data:books
        })
    }catch (err){
        console.log(err.message);
        res.status(500).json({
            status:'fail',
            message:err.message
        })
    }
});

//route for Get One Book By Id From DB

router.get('/:id' , async (req,res) =>{
    try{
        const {id} = req.params;
        const result = await Book.findById(id,req.body);

        return res.status(200).json({
            status:'success',
            data:result
        })
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send({ message: error.message });
        }
});
//route for detele a book
router.delete('/:id' , async (req,res) =>{

    try {

    const {id} = req.params;
    const result = await Book.findByIdAndDelete(id, req.body);
    return res.status(200).json({
        status: 'success',
        message:"book Deleted Sucessfully"
    })}catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
        }

});
router.put('/:id', async (request, response) => {
    try {
    if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
    ) {
        return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
        });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
        return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
    }
});


export default router;
