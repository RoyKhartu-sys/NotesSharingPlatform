require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Note=require("./model/note");
const User = require("./model/user");
const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err=> console.log(err));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const authenticateToken = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({
            message: "Not authenticated"
        });
    }
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({
            message: "Account created successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error"
        });
    }
});
app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign(
            {
                userId: user._id,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.json({
            message: "Signed in successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error"
        });
    }
});
app.get("/me", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
});
app.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });
    res.json({
        message: "Logged out successfully"
    });
});
app.post("/upload", authenticateToken, async(req, res)=>{
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