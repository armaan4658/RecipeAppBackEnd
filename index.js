// const express = require('express');
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {Recipe} from './models/users.js';
const app = express();
const PORT = 5000;
const USERS = [
    {
        "product_name":"Fancy Product",
        "product_price":"$40.00-$80.00",
        "img":"https://cdn5.vectorstock.com/i/1000x1000/62/89/black-shopping-cart-icon-isolated-on-yellow-vector-33126289.jpg"
    },
    {
        "product_name":"Popular Item",
        "product_price":"$40.00",
        "img":"https://cdn5.vectorstock.com/i/1000x1000/62/89/black-shopping-cart-icon-isolated-on-yellow-vector-33126289.jpg"
    },
    {
        "product_name":"Fancy Product",
        "product_price":"$40.00-$80.00",
        "img":"https://cdn5.vectorstock.com/i/1000x1000/62/89/black-shopping-cart-icon-isolated-on-yellow-vector-33126289.jpg"
    },
    {
        "product_name":"Sale Item",
        "product_price":"$25.00",
        "img":"https://cdn5.vectorstock.com/i/1000x1000/62/89/black-shopping-cart-icon-isolated-on-yellow-vector-33126289.jpg"
    },
    {
        "product_name":"Popular Item",
        "product_price":"$40.00",
        "img":"https://cdn5.vectorstock.com/i/1000x1000/62/89/black-shopping-cart-icon-isolated-on-yellow-vector-33126289.jpg"
    },
    {
        "product_name":"Fancy Product",
        "product_price":"$40.00-$80.00",
        "img":"https://cdn5.vectorstock.com/i/1000x1000/62/89/black-shopping-cart-icon-isolated-on-yellow-vector-33126289.jpg"
    },
    {
        "product_name":"Sale Item",
        "product_price":"$25.00",
        "img":"https://cdn5.vectorstock.com/i/1000x1000/62/89/black-shopping-cart-icon-isolated-on-yellow-vector-33126289.jpg"
    },
    {
        "product_name":"Fancy Product",
        "product_price":"$40.00-$80.00",
        "img":"https://cdn5.vectorstock.com/i/1000x1000/62/89/black-shopping-cart-icon-isolated-on-yellow-vector-33126289.jpg"
    },
    {
        "product_name":"Popular Item",
        "product_price":"$40.00",
        "img":"https://cdn5.vectorstock.com/i/1000x1000/62/89/black-shopping-cart-icon-isolated-on-yellow-vector-33126289.jpg"
    }
]
//Data base url

//const url ="mongodb+srv://armaan:guvi123456@cluster0.qx8hr.mongodb.net/recipeApp?retryWrites=true&w=majority";
const url ="mongodb://localhost/recipeApp";
mongoose.connect(url,{useNewUrlParser:true});
//opening connection
const con = mongoose.connection;
con.on('open',()=>console.log('MongoDB is connected'));
//Creating middleware
app.use(express.json());
//implementing cors
// var allowedOrigins = ['http://localhost:3000'];
// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin 
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));
app.get('/',(request,response)=>{
    response.send('Welcome to postman');
})
app.get('/recipes',async(request,response)=>{
    try{
        const users = await Recipe.find();
        response.send(users);
    }catch(e){
        response.send(e);
    }  
})
app.post('/recipes',async(request,response)=>{
    const addUser = request.body;
    const user = new Recipe(addUser);
    try{
        const newUser = await user.save();
        response.send(newUser);
    }catch(e){
        response.send(e);
    } 
})
app.get('/recipes/:id',async(request,response)=>{
    const {id} = request.params;
    const user = await Recipe.findById(id);
    response.send(user);
})
app.delete('/recipes/:id',async(request,response)=>{
    const {id} = request.params;
    const user = await Recipe.findById(id);
    await user.remove();
    response.send(user);
    console.log(user);
})
app.patch('/recipes/:id',async(request,response)=>{
    const update = request.body;
    const {id} = request.params;
    try{
        const user = await Recipe.updateOne({"_id":id},update);
        response.send(user);
    }catch(e){
        response(e);
    }
    
})
app.listen(PORT,()=>console.log('The server is started'));