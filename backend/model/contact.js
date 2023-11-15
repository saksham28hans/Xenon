const mongoose = require('mongoose');

const ContactSchema =new mongoose.Schema({
    name : {type:String,required:true,unique:true},
    email : {type:String,required:true,unique:true},
    message : {type:String,default:""},
    },
     {timestamps:true}
  );

  module.exports = mongoose.model("Contact",ContactSchema);