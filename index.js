import express from "express";
import {port , mongodburl} from './config.js'
import bookRoutes from './routes/bookRoutes.js'
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
// عشان اقدر استفاد من ال ال body بتاع ال request
app.use(express.json());

//middleware for handling cors policy
// option 1 : allow all Origins with defualt of cors
app.use(cors());

//option 2 :allow Custome Origins
/*oapp.use(
    cors({
        origin:'http://localhost:3000',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-Type'],
    })
);*/

app.get('/',(req,res) => {
    console.log(req);
    return res.status(234).send('welcome To MERN Stack Turtorial');

});

app.use('/books', bookRoutes);

// connect to database
mongoose.connect(mongodburl).then(() => {
    console.log('App Connected To DataBase');
    app.listen(port ,() =>{console.log("App Is Runing Successfully")})


}).catch(( err)=>{
    console.log(err)
})


