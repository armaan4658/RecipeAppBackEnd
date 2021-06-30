import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    "recipe_name":{
        type:String,
        require:true
    },
    "recipe_pic":{
        type: String,
        require:true
    },
    "ingredient":{
        type:String,
        require:true
    },
    "instruction":{
        type:String,
        require:true
    }
})
export const Recipe = mongoose.model("Recipe",userSchema);