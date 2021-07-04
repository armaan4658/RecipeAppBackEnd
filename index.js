// const express = require('express');
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {Recipe} from './models/users.js';
import bcrypt from "bcrypt";
const app = express();
const PORT = process.env.PORT || 5000;
//Data base url
const url = process.env.MONGODB_URI || "mongodb://localhost/RecipeData";
//const url =  "mongodb://localhost/recipeApp";
// const url = process.env.MONGODB_URI ;

mongoose.connect(url,{useNewUrlParser:true});
//opening connection
const con = mongoose.connection;
con.on('open',()=>console.log('MongoDB is connected'));
//Creating middleware
app.use(express.json());
//implementing cors
var allowedOrigins = ['https://recipe-app-front-end.netlify.app/'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.get('/',(request,response)=>{
    response.send('Welcome to postman');
})
app.get('/recipes',async(request,response)=>{
    const q = request.query;
    // q = new RegExp(`/^${q}/`, 'gi');
    try{
        // if(q){
        //     const users = await Recipe.find({"recipe_name":{$regex:`/^*${q.recipe_name}/`,$options:'i'}});
        //     response.send(users);
        // }else{
            const users = await Recipe.find();
            response.send(users);
        // }
        // console.log(request.query);
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
    const { id } = request.params;
    const {recipe_name,recipe_pic,ingredient,instruction} = request.body;
    try{
        const recipe = await Recipe.findById(id);
        if(recipe_name){
            recipe.recipe_name = recipe_name;
        }
        if(recipe_pic){
            recipe.recipe_pic = recipe_pic
        }
        if(ingredient){
            recipe.ingredient = ingredient;
        }
        if(instruction){
            recipe.instruction = instruction;
        }
        await recipe.save();
        response.send(user);
    }catch(e){
        response(e);
    }
    
})
app.listen(PORT,()=>console.log('The server is started at port',PORT));
const db = "const password = '@password123';"
async function getHash(){
    const password = '@password123';
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password,salt);
    console.log(salt,passwordHash);
}
getHash();
async function verifyUser(){
    const password = '@password123';
    const isMatch = bcrypt.compare(password)
}