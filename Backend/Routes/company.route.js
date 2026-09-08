import express  from "express";
const router =express.Router();
import {updateCompany,getCompanyById,getCompany,registerCompany} from "../controller/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
 
router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get( isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put( isAuthenticated,  updateCompany);

export  default router;