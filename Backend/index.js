// creating server 
 // const express = require("express") older ways to import  for new ways change type="module in package.json "

 
 import express from "express";
 import cookieParser from "cookie-parser";
 import cors from "cors";
 import dotenv from "dotenv";
 import connectDB from "./utils/db.js";
 import userRoute from "./Routes/user.route.js";
 import companyRoute from "./Routes/company.route.js";
 import jobRoute from "./Routes/job.route.js";
 import applicationRoute from "./Routes/application.route.js";
dotenv.config({});
 const app =express();
 const corsOptions ={
    origin:"http://localhost:5173",
    credentials :true
 }
 // middlewares 
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use(cookieParser());
app.use(cors(corsOptions));

 const PORT =process.env.PORT || 3000;

 // Api's
 app.use("/api/v1/user", userRoute);
app.use("/api/v1/company" , companyRoute);
app.use("/api/v1/job" ,jobRoute );
app.use("/api/v1/application" ,applicationRoute );
 connectDB().then(() => {
  app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
  });
});
  



