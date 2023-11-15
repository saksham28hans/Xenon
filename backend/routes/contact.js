const router = require('express').Router();
const Contact = require('../model/contact');

router.post('/',async (req,res)=>{

    const newContact = new Contact({
        name : req.body.name,
        email : req.body.email,
        message : req.body.message
    })

    try{
        const con = await newContact.save();
        return res.status(201).json(con);
    }
    catch(error){
        return res.status(500).json(error);
    }

})

module.exports = router;