const express=require('express')
const mongoose=require('mongoose')
const user=require('./UserChats')
const cors=require('cors')

const app=express()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


mongoose.connect('mongodb+srv://Ankit_Sharma:mongodb%4022062022@cluster0.bliuxbu.mongodb.net/Chats?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    
// ==========================================Register===============================================
app.post('/new',(req,res)=>{
    const data=new user({
        _id:new mongoose.Types.ObjectId,
        Phone:req.body.Phone,
        Text:req.body.Text,
        Time:req.body.Time,
        Visibilty:req.body.Visibilty
    })
    data.save().then((e)=>{
        res.send({res:e})    
    })
})
//===========================================
app.post('/',async (req,res)=>{
    const data= await user.find({Phone:req.body.Phone})
    res.send({err:data})
})

app.post('/del',async (req,res)=>{
    
    let resu=await user.deleteOne({_id:req.body.id})
    console.log(resu)
    
})
app.put("/",async (req,res)=>{
    
    let result=await user.updateOne({_id:req.body.id},{Text:req.body.Text})
    // console.log(result)
    
})
app.listen(3002,()=>{
    console.log("server running")
})