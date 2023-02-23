const mongose=require('mongoose')
 
let userSchema=new mongose.Schema({
    _id:mongose.Schema.Types.ObjectId,
    Phone:{
        type:String,
       
    },
    Text:{
        type:String,
       
    },
    Time:{
        type:String,
      
    }, 
    Visibilty:{
       type:String
    },
})
module.exports=mongose.model('Notes',userSchema)