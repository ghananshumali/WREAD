import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req,res)=>{

    try{

        const {username,email,password} = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "username, email and password are required" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password,10);

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        });

        const savedUser = await newUser.save();
        const { password: _password, ...safeUser } = savedUser.toObject();

        res.status(201).json({ message: "User created successfully", user: safeUser });

    }catch(error){

        res.status(500).json({ message: error.message });

    }

};


export const login = async (req,res)=>{

    try{

        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const validPassword = bcrypt.compareSync(password,user.password);

        if(!validPassword){
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const {password:pass,...rest} = user._doc;

        res
        .cookie("access_token",token,{
            httpOnly:true,
            sameSite:"lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .status(200)
        .json({ ...rest, token });

    }catch(error){

        res.status(500).json({ message: error.message });

    }

};

export const logout = async (req, res) => {
    res
        .clearCookie("access_token", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        })
        .status(200)
        .json({ message: "Logged out successfully" });
};

export const me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};