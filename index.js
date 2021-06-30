// const express = require('express');
import express from "express";
import mongoose from "mongoose";
import {User} from './models/users.js';
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

const url ="mongodb+srv://armaan:guvi123456@cluster0.qx8hr.mongodb.net/recipeApp?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser:true});
//opening connection
const con = mongoose.connection;
con.on('open',()=>console.log('MongoDB is connected'));
//Creating middleware
app.use(express.json());
app.get('/',(request,response)=>{
    response.send('Welcome to postman');
})
app.get('/recipes',async(request,response)=>{
    try{
        const users = await User.find();
        response.send(users);
    }catch(e){
        response.send(e);
    }  
})
app.post('/recipes',async(request,response)=>{
    const addUser = request.body;
    const user = new User(addUser);
    try{
        const newUser = await user.save();
        response.send(newUser);
    }catch(e){
        response.send(e);
    } 
})
app.get('/recipes/:id',async(request,response)=>{
    const {id} = request.params;
    const user = await User.findById(id);
    response.send(user);
})
app.delete('/recipes/:id',async(request,response)=>{
    const {id} = request.params;
    const user = await User.findById(id);
    await user.remove();
    response.send(user);
    console.log(user);
})
app.patch('/recipes/:id',async(request,response)=>{
    const {id} = request.params;
    const user = await User.updateOne({"id":id})
})
app.listen(PORT,()=>console.log('The server is started'));