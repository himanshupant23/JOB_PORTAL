import express  from "express";
const router =express.Router();

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postjob } from "../controller/job.controller.js";
 
router.route("/post").post(isAuthenticated, postjob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
export  default router;