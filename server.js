const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Note=require("./model/note");
const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err=> console.log(err));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.post("/upload", async(req, res)=>{
    try{
        const note = new Note({
            name:req.body.name,
            subject: req.body.subject,
            content: req.body.content
        });
        await note.save();
        res.json({message:"success"});
    } catch(err){
        console.log(err);
        res.status(500).send("error");
    }
});
app.get("/search", async(req, res)=>{
    try{
        const search = req.query.search;
        const notes = await Note.find({
            subject:{
                $regex: search,
                $options: "i"
            }
        });
        res.json(notes);
    }catch(err){
        console.log(err);
        res.status(500).send("error");
    }
});
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});