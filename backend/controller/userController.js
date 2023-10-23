const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWT_SECRET

//  Login User
const loginUser = async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({success:false, message : "Please Enter All The Fiedls!"});
    }
    const userExists = await User.findOne({email});
    
    if(userExists && await bcrypt.compare(password,userExists.password)){
        jwt.sign({userExists},jwtKey,(err,token)=>{
            if(err){
                return res.status(400).json({success:false, message : "Something went Wrong, Please try after some time."});
            }
            return res.status(200).json({success:true,message:"Login Successfull!",userExists,token});
        })
    }else{
        return res.status(400).json({success:false, message : "Please Enter Valid Information."});
    }
}


// Register User
const registerUser = async (req,res)=>{
    const {name, email, password, password2, address} = req.body;
    if(!name || !email || !password || !password2 || !address){
        return res.status(400).json({success:false, message : "Please Enter All The Fiedls!"});
    }
    if(password !== password2){
        return res.status(400).json({success:false, message : "Password is not match."});
    }
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({success:false, message : "User already Exists."});
    }
    const salt = await bcrypt.genSalt(10);

    const user = await User.create({
        name : name,
        email : email,
        password : await bcrypt.hash(password,salt),
        address : address,
    })

    if(user){
        jwt.sign({user},jwtKey,(err, token)=>{
            if(err){
                return res.status(400).json({success:false, message : "Something went Wrong, Please try after some time."});
            }
            return res.status(200).json({success:true,message:"Register successfully!", user, token});
        })
    }else{
        return res.status(400).json({success:false, message : "Something went Wrong, Please try after some time."});
    }
}


// All Reporters
const allReporters = async(req, res)=>{
    // console.log("hi hellow!")
    const user = await User.find({});
    if(user){
        return res.status(200).json({
            success : true,
            user,
        })
    }else{
        return res.status(400).json({
            success : false,
            message : "Something Went Wrong, Please Try After Sometime."
        })
    }
}
// Create Admin
const create = async (req,res)=>{
    const id = req.headers.id;
    const user = await User.findByIdAndUpdate({_id:id},{
        isAdmin : true,
    });
    if(user){
        const user2 = await User.find({});
        if(user2){
            return res.status(200).json({
                success : true,
                message : "Admin created Successfully!",
                user : user2,
            })
        }else{
            return res.status(400).json({
                success : false,
                message : "Something Went Wrong",
            })
        } 
    }else{
        return res.status(400).json({
            success : false,
            message : "Something Went Wrong",
        })
    }
}
// Remove Admin
const remove = async (req,res)=>{
    // console.log("make admin")
    const id = req.headers.id;
    const user = await User.findByIdAndUpdate({_id:id},{
        isAdmin : false,
    });
    if(user){
        const user2 = await User.find({});
        if(user2){
            return res.status(200).json({
                success : true,
                message : "Admin created Successfully!",
                user : user2,
            })
        }else{
            return res.status(400).json({
                success : false,
                message : "Something Went Wrong",
            })
        } 
    }else{
        return res.status(400).json({
            success : false,
            message : "Something Went Wrong",
        })
    }
}

// Delete Reporter
const deleteReporter = async (req,res)=>{
    const id = req.headers.id;
    const user = await User.findByIdAndDelete({_id:id});
    if(user){
        const user2 = await User.find({});
        if(user2){
            return res.status(200).json({
                success : true,
                message : "Admin created Successfully!",
                user : user2,
            })
        }else{
            return res.status(400).json({
                success : false,
                message : "Something Went Wrong",
            })
        } 
    }else{
        return res.status(400).json({
            success : false,
            message : "Something Went Wrong",
        })
    }
} 

module.exports = {loginUser, registerUser, allReporters, create, remove, deleteReporter}