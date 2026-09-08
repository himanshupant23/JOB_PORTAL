import { Job } from "../models/job.model.js";
// admin posting jobs 
export const postjob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirement,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirement ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirement: requirement.split(","),
      salary: Number(salary),
      location,
      jobType,
      experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
// user getting all jobs 
export const getAllJobs = async(req,res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword , $options:"i"}},
                {description:{$regex:keyword , $options:"i"}}
            ]
        };
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({
                message:"jobs not found",
                success:false,
            })
        };
return res.status(200).json({
    jobs,
    success:true,
})
    } catch (error) {
        console.log(error);
    }
  
}

export const getJobById =async(req,res)=>{
    try {
        const jobId = req.params.id;
        const job =await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"jobs not found ",
                success:false
            })
        };
        return res.status(200).json({
            job,
            success:true,
        })
    } catch (error) {
        console.log(error)
    }
}
//how many jobs are created by admin 
export const getAdminJobs = async(req,res)=>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({
                message:"jobs not found ",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true,
        })
    } catch (error) {
        console.log(error)
    }
}
