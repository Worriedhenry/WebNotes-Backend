const mongose=require('mongoose')
// const encryption=require('mongoose-encryption')

let userSchema=new mongose.Schema({
    _id:mongose.Schema.Types.ObjectId,
    name:{
        type:String,
        required: [true, 'Please Enter Name']
    },
    Phone:{
        type:Number,
        required: [true, 'Please Enter Phone'],
        min:5000000000,
        max:10000000000

    },
    Password:{
        type:String,
        required: [true, 'Please Enter Pass']
    },
    Created:{ type : Date, default: Date.now },
    Notes:[{
        NoteText:String,
        Time : { type : Date, default: Date.now },
        Format:String,
        Color:String
    }],
    Todo:[{
        TodoText:{
            type:String,
            default:"untitled"
        },
        TodoHeading:{
            type:String,
            default:"untitled"
        },
        Time : { type : Date },
        Format:String,
        Color:String,
        Status:Boolean
    }]
})
console.log(process.env.SECRET)
// userSchema.plugin(encryption,{ secret: process.env.SECRET, excludeFromEncryption: ['Phone','name'] })
module.exports=mongose.model('Users',userSchema) 