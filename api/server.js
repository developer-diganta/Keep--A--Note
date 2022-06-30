require('dotenv').config();
const express=require("express");
const bodyParser=require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const md5=require("md5");
const app=express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cors());
const url="mongodb+srv://"+process.env.MONGO_USERNAME+":"+process.env.MONGO_PASSWORD+"@cluster0.mlb5l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser: true});
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENTID)

const noteSchema = new mongoose.Schema({
    email:String,
    notes:[]
});


const Note=mongoose.model("Note",noteSchema);


app.get("/",function(req,res){
    res.send("SUCESSFULLY RUNNING ");
})



app.post("/api/getNotes",async function(req,res){
    const {token} = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token.token,
        audience: process.env.GOOGLE_CLIENTID
    });

    const email= md5(ticket.getPayload().email); 
    Note.find({email:email},function(err,found){
        
        if(!err){
            res.json(found);
        }
        else{
            console.log(err);
            res.json("EMPTY");
        }
    })
})





app.post("/api/addNotes",async function(req,res){
    const {token} = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token.token,
        audience: process.env.GOOGLE_CLIENTID
    });

    const email= md5(ticket.getPayload().email); 
 

    const note = {
        name:req.body.data.name,
        desc:req.body.data.desc,
        image:req.body.data.image
    };

    Note.findOneAndUpdate({email:email},{$push:{notes:note}},function(err,found){
        if(err){
            console.log("ERROR -> " + err);
            res.json("ERROR");
        }
        else{
            if(found===null){
                const notes=[note];
                const noteAccount = new Note({
                    email:email,
                    notes:notes
                });
                noteAccount.save(async function(err){
                    if(err){
                       res.json("ERROR!");
                    }
                    else{
                       res.json("ADDED!");
                    }
                })
            }
            else{
                res.json("ANS")
            }
        }    
        
    })
});


app.post("/api/deleteNotes",async function(req,res){
    const {token,id} = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token.token,
        audience: process.env.GOOGLE_CLIENTID
    });

    const email= md5(ticket.getPayload().email); 
  

    const a = await Note.findOne({email:email},async function(err,data){
        let notes=data.notes;
        notes.splice(id,1);
        const b= await Note.findOneAndUpdate({email:email},{notes:notes},async function(err,data){
            if(err){
                console.log(err);
                res.json(err);
            }
            else{
                res.json("SUCCESS!!!!!");
            }
        })
    })
})

app.post("/api/editNotes", async function(req,res){
    const {token,id,data} = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token.token,
        audience: process.env.GOOGLE_CLIENTID
    });

    const email= md5(ticket.getPayload().email); 


    const a = await Note.findOne({email:email},async function(err,doc){
        let notes=doc.notes;
        notes[id].name=data.name;
        notes[id].desc=data.desc;
        notes[id].image = data.image;
        notes[id].pinned = data.pinned;
        const b= await Note.findOneAndUpdate({email:email},{notes:notes},async function(err,data){
            if(err){
                console.log(err);
            }
            else{
                res.json("SUCCESS!!!!!");
            }
        })
    })
})



app.listen(process.env.PORT || 5000,function(){
    console.log("Running on 5000");
});
