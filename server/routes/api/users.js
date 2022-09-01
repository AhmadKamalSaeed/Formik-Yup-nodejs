const express = require('express');
let router = express.Router();
require('dotenv').config()

const { User } = require('../../models/user_model');
const { checkLoggedIn } = require('../../middleware/auth');

router.route("/register").post(async (req,res)=>{
    console.log(req.body)
    try{

        /// check if email taken
        if(await User.emailTaken(req.body.email)){
            return res.status(400).json({message:'Sorry email taken'})
        }

        /// creating the model ( hash password)
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });

        /// generate token
        const token = user.generateToken()
        const doc = await user.save();

        /// save...send token with cookie
        res.cookie('x-access-token',token)
        .status(200).send(getUserProps(doc)); 

    } catch(error){
    res.status(400).json({message:'Error',error: error })
    }
    
})

router.route("/signin").post(async(req,res)=>{
    try{

          // FIND USER
        let user = await User.findOne({email:req.body.email})
        if(!user) return res.status(400).json({message:'Bad email'});

          /// COMPARE PASSWORD
        const compare = await user.comparePassword(req.body.password);
        if(!compare) return res.status(400).json({message:'Bad password'});

          // GENERATE TOKEN
        const token = user.generateToken();

          //RESPONSE
        res.cookie('x-access-token',token)
        .status(200).send(getUserProps(user)); 

    } catch(error){
        res.status(400).json({message:'Error',error: error })
    }
})

router.route("/getusers")
.get(checkLoggedIn, async(req,res)=>{
    try {
        const user = await User.find({});

        if(!user) return res.status(400).json({message:'Users not found'})

        res.status(200).send(user)
    } catch(error){
        res.status(400).json({message:"Problem updating",error:error});
    }
})

router.route("/getuser/:id")
.get(checkLoggedIn, async(req,res)=>{
    try {
        let id = req.params.id
        const user = await User.findById(id);
        if(!user) return res.status(400).json({message:'Users not found'})
        res.status(200).send(user)
    } catch(error){
        res.status(400).json({message:"Problem updating",error:error});
    }
})

router.route("/profile/:id")
.patch(checkLoggedIn, async(req,res)=>{
    try {
        const _id = req.params.id;
        const user = await User.findOneAndUpdate(
            {_id: _id},
            {
                "$set":{
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                }
            },
            { new: true }
        );
        if(!user) return res.status(400).json({message:'User not found'})

        res.status(200).json(getUserProps(user))
    } catch(error){
        res.status(400).json({message:"Problem updating",error:error});
    }
})


// router.route("/update_email/:id")
// .patch(checkLoggedIn,async (req,res)=>{
//     try{
//         /// make 
//         if(await User.emailTaken(req.body.newemail)){
//             return res.status(400).json({message:"Sorry email taken"})
//         }

//         const _id = req.params.id;
//         const user = await User.findOneAndUpdate(
//             {_id: _id, email: req.body.email },
//             {
//                 "$set":{
//                     email: req.body.newemail
//                 }
//             },
//             {new:true}
//         );
//         if(!user) return res.status(400).json({message:'User not found'})

//         const token = user.generateToken();
//         res.cookie('x-access-token',token)
//         .status(200).send({email:user.email})
//     } catch(error){
//         res.status(400).json({message:"Problem updating",error:error});
//     }
// })


router.route('/isauth')
.get(checkLoggedIn,async (req,res) =>{
    res.status(200).send(getUserProps(req.user))
})



const getUserProps = (user) => {
    return{
        _id: user._id,
        email: user.email,
        firstname:user.firstname,
        lastname: user.lastname,
        title: user.title,
    }
}


module.exports = router;