const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const user=require('./Users')
const UserChats=require('./UserChats')
var http = require('http');
const cors=require('cors')
const Users = require('./Users')
const app=express()
var server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(process.env.SECRET)

mongoose.connect('mongodb+srv://Ankit_Sharma:mongodb%4022062022@cluster0.bliuxbu.mongodb.net/Notes?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })





io.on("connection",(socket)=>{
    socket.on("Changed",(e)=>{
        // console.log("hi")
        socket.emit("Changing",e)
    })
})
//=========================================Login==================================================
app.post('/',async (req,res)=>{
    // console.log(req.body)
    if(req.body.Phone==null){
        return
    }
    // console.log("hii")
    const data= await user.findOne({Phone:req.body.Phone}) 
    // console.log(data)
    res.send({err:data.Notes})
    
})
app.post("/profile",async (req,res)=>{
    let data=await user.findOne({Phone:req.body.User})
    res.send({err:data})
})
app.post('/del',async (req,res)=>{
    
    let r = await user.findOne({id:req.body.Phone})
    var arr=r.Notes
    var arr1=[]
    arr.forEach((e)=>{
        if(e._id==req.body.id){
        }
        else{
            arr1.push(e)
        }

    })
    r=await user.updateOne({Phone:req.body.Phone},{$set:{Notes:arr1}})
    // console.log(r,arr1,arr)
    res.send({array:arr1})
    
})
app.put("/",async (req,res)=>{
    
    let r = await user.findOne({id:req.body.Phone})
    var arr=r.Notes
    arr.forEach((e)=>{
        if(e._id==req.body.id){
            e.NoteText=req.body.Text
            e.Color=req.body.Color,
            e.Format=req.body.Format
        }
    })
    r=await user.updateOne({Phone:req.body.Phone},{$set:{Notes:arr}})
    res.send(r)
    
})
//==========================================Register===============================================
app.post("/test",async (req,res)=>{
    let r = await user.findOne({id:'63ddedc6621c52abc9d5dcda'})
    var arr=r.Notes
    arr.forEach((e)=>{
        if(e._id=="63ddedc6621c52abc9d5dcda"){
            e.NoteText="Updated Text"
        }
    })
    r=await user.updateOne({Phone:'7814987712'},{$set:{Notes:arr}})
    // console.log(arr)
    res.send(r)
})
app.post('/register',async (req,res)=>{
            const data=new user({
                _id:new mongoose.Types.ObjectId,
                name:req.body.name,
                Phone:req.body.Phone,
                Password:req.body.Password,
                Notes:[]
            })
            let Aluser=await user.findOne({Phone:req.body.Phone})
            if(Aluser){
                res.send({err:201})
            }
            else if(req.body.Password!=req.body.cpassword  && req.body.Phone.lenght<=0){
                res.send({err:202})
            }
            else{
                data.save()
                res.send({err:200})
            } 
})
app.get("/public",async (req,res)=>{
    let all=await Users.find()
    PublicNotes=[]
    for(i=0;i<99;i++){
        if(i>all.length-1){
            break
        }
        for(j=0;j<6;j++){
            if(j>all[i].Notes.length -1){
                break
            }
            if(all[i].Notes[j].Format=="Public"){
                PublicNotes.push(all[i].Notes[j])
            }
        }
    }
    res.send({PublicNotes})
})
//================================================Login==================================================
app.post('/login',async (req,res)=>{
    // console.log("hello")
    let Aluser=await user.findOne({Phone:req.body.Phone})
    // console.log(Aluser)
    // console.log(req.body)
    if(Aluser){
            if(Aluser.Password===req.body.Password){
                    res.send({err:200,
                            Name:Aluser.name
                    })
            }
            else{
                res.send({err:300})
            }
        }
    else{
        res.send({err:300})
    }
})
//===============================================Home====================================================
app.post('/new',async (req,res)=>{
    const data={
        NoteText:req.body.Text,
        Format:req.body.Visibilty,
        Color:"#FFFFFF"
    }
    let result= await user.updateOne({Phone:req.body.Phone},{$push:{Notes:data}})
    // console.log(result)
    res.send({error:200})
})
server.listen(3001,()=>{
    console.log("server running")
})

