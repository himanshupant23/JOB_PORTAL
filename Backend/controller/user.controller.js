import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, Email, phoneNumber, Password, role } = req.body;
    if (!fullName || !Email || !phoneNumber || !Password || !role) {
      return res.status(400).json({
        message: "something is missing ",
        success: false,
      });
    }
    const user = await User.findOne({ Email });
    if (user) {
      return res.status(400).json({
        message: "user already exist",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(Password, 12);
    await User.create({
      fullName,
      Email,
      phoneNumber,
      Password: hashedPassword,
      role,
    });
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// login
export const login = async (req, res) => {
  try {
  
    const { Email, Password, role } = req.body;
  
    if (!Email || !Password || !role) {
      return res.status(400).json({
        message: "something is missing ",
        success: false,
      });
    }
   
    const user = await User.findOne({ Email });
 
    if (!user) {
      return res.status(400).json({
        message: "incorrect email or password ",
        success: false,
      });
    }
  
    const isPasswordMatched = await bcrypt.compare(Password, user.Password);
  
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "incorrect email or password ",
        success: false,
      });
    }
   
    //check role is correct or not
    if (role != user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role. ",
        success: false,
      });
    }
  
    const tokenData = {
      userId: user.id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
  
     const userData = {
      _id: user._id,
      fullName: user.fullName,
      email: user.Email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      Profile: user.Profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSize: "strict",
      })
      .json({
        message: `welcome back ${user.fullName}`,
        user: userData,
        success: true,
        
      }); 
    
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullName, Email, phoneNumber, bio, skills } = req.body;
   
    let skillsArray;
    if(skills){
      skillsArray = skills.split(",");
    }
    
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found  ",
        success: false,
      });
    }
    //updating data
    if(fullName){
      user.fullName = fullName;
    }
      if(Email){
        user.Email = Email;
      }
        if(phoneNumber){
          user.phoneNumber=phoneNumber;
        }
          if(bio){
            user.Profile.bio = bio;
          }
            if(skillsArray){
              user.Profile.skills = skillsArray;
            }

   
    await user.save();
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.Email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      Profile: user.Profile,
    };
    return res.status(200).json({
      message: "profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
