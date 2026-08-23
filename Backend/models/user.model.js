import mongoose from "mongoose";
const userSchema =  new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "Recruiter"],
    required: true,
  },
  Profile: {
    bio: { type: String },
    skills: { type: String },
    resume: { type: String }, //url to resume file
    resumeOriginalName: { type: String },
    company: {type: mongoose.Schema.ObjectId,ref:"Company"},
    profilePhoto:{
        type:String,
        default:""
    }},

},{timestamps:true});
export const User = mongoose.model("User",userSchema);
