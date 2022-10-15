const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')


const registerUser=asyncHandler(async(req,res)=>{
    const{name,email,password}=req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists=await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')

    }
    
    // Hash password

    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    // create User

    const user= await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        console.log(user + "jekj")
        res.status(201).json({
            name:user.name,
            email:user.email,
            _id:user._id,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('invalid user details')
    }

})



//@description: authenticate a user
// @route : POST /api/users/login
// @access : public

const loginUser=asyncHandler(async(req,res)=>{

   const {email,password}=req.body
   const user=await User.findOne({email})
   console.log(user + "loginuser")

   if(user && (await bcrypt.compare(password,user.password))){
    console.log(user + "login")
    res.json({
        name:user.name,
            email:user.email,
            _id:user._id,
            role:user.role,
            token:generateToken(user._id)
    })
   }
   else{
    res.status(400)
        throw new Error('invalid  details')
   }

 })


 //@description: Get user data
// @route : GET /api/users/me
// @access : private

const getMe=asyncHandler(async(req,res)=>{
    const{_id,name,email}=await User.findById(req.user.id)

    res.status(200).json({
        id:_id,
        email,
        name
    })
    // res.json({message:"User data display"})
 })


 // Generate JWT

 const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
 }

 //find user 
const getAllUser=asyncHandler(async(req,res)=>{
    const user=await User.find({})
    
    
        res.json({status:true,users:user})
});
const updateUser=asyncHandler(async (req, res) => {
    const id = req.params.id
    const users = await User.findOne({_id:id})
    const user = await User.updateOne({ _id: id }, { $set: { status: !users.status } })
    res.status(200).json({ status: true })
})

const findOneuser=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const userDelete=await User.findById(id)
    res.json(userDelete)
})







module.exports={
    registerUser,loginUser,getMe,findOneuser,getAllUser,updateUser
}