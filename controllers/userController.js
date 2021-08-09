const express = require('express');
const User  = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var ObjectId = require('mongoose').Types.ObjectId;
const userRouter = express.Router();


 userRouter.get('/', (req, res) => {
    User.find((err, docs) => {
        if (!err) { res.send(docs); }
       else { console.log('Error in Retriving Users:' + JSON.stringify(err, undefined, 2)); }
    });
});

userRouter.post('/register',async(req,res)=> {

 const  emailExist = await User.findOne({email:req.body.email});
if(emailExist) return res.status(400).send('email already exists');
    
const user = new User(req.body);
try{
    await user.save();
    res.status(201).send(user);
}catch (error){
    res.status(580).send(error);
}

});

userRouter.post('/login',async(req,res)=> {

    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('user not found');

const validPass = await bcrypt.compare(req.body.password, user.password);
if(!validPass) return res.status(400).send('invalid password');
// create a token 
const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET);
res.header('auth-token',token).send(token);

    });

userRouter.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404);
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

/*userRouter.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})*/
userRouter.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})
userRouter.patch('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, doc) => {
        if (!err) 
        { res.send(doc); 
            console.log("user is modified!!");}
        else { console.log('Error in User  Update :' + JSON.stringify(err, undefined, 2)); }
    });
});
 // create team for user
        //------------------------
      /*  if(req.body.role=="MANAGER"){

            var team = new Team({
                name: req.body.team_name,
                manager: user._id,
            });

            team.save(function(err) {
                if(err) {
                    // res.send(err);
                    console.log("Error while saving team "+err);
                    return;
                }
                console.log("team is saved Successfully " +team);
            });
        }

    res.json({ success: true, message: 'User has been created !'});*/


 /*userRouter.post('/', async(req, res) => {
   const user = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        poste: req.body.poste,
        experience: req.body.experience,
        type_contrat: req.body.type_contrat,
        date_entree: req.body.date_entree,
        stack_principale: req.body.stack_principale,
        stack_secondaire: req.body.stack_secondaire,

    });
   user.save()
  
});
*/
userRouter.post('/',async(req,res)=> {
   const user = new User(req.body);
   try{
       await user.save();
       res.status(201).send(user);
   }catch (error){
       res.status(580).send(error);
   }
   
   });

module.exports = userRouter ;