const router = require('express').Router();
const{Intro , About , Project , Contact } = require('../models/portfolioModel');
const User = require("../models/userModel");

//get all portfolio data
router.get('/get-portfolio-data' , async(req,res)=>{
    try{
        const intros = await Intro.find();
        const abouts = await About.find();
        const projects = await Project.find();
        const contacts = await Contact.find();

        res.status(200).send({
            intro: intros[0],
            about: abouts[0],
            projects: projects,
            contact: contacts[0],
        });
    }catch (error){
        res.status(500).send(error);
    }
});

//update intro
router.post("/update-intro",async (req,res)=>{
    try{
        const intro = await Intro.findOneAndUpdate(
            
                {_id:req.body._id},
                req.body,
                {new:true}
            
        );
        res.status(200).send({
            data : intro,
            success : true ,
            message  : "Intro updated successfully"
        });

    }catch(error){
        res.status(500).send(error);
    }
});

//update about
router.post("/update-about",async (req,res)=>{
    try{
        const about = await About.findOneAndUpdate(
            
                {_id:req.body._id},
                req.body,
                {new:true}
            
        );
        res.status(200).send({
            data : about,
            success : true ,
            message  : "About updated successfully"
        });

    }catch(error){
        res.status(500).send(error);
    }
});

//add projects

router.post("/add-project", async (req, res) => {
    try{
        const project = new Project(req.body);
        await project.save();
        res.status(200).send({
            data: project,
            success: true,
            message: "Experience added successfully",

        });

    }catch(error){
        res.status(500).send(error);
    }
});

//update project
router.post("/update-project", async (req,res)=>{
    try{
        const project = await Project.findOneAndUpdate(
            { _id:req.body._id },
            req.body,
            {new: true}
        );
        res.status(200).send({
            data:project,
            success:true,
            message:"project updated successfully",
        });

    }catch(error){
        res.status(500).send(error);
    }
});


//delete projects

router.post("/delete-project", async(req,res)=>{
    try{
     const project = await Project.findOneAndDelete({_id:req.body._id});
           
        
        res.status(200).send({
            data:project,
            success:true,
            message:"project updated successfully",
        });

    }catch(error){
        res.status(500).send(error);
    }
    });

    //update contact
    router.post("/update-contact",async (req,res)=>{
        try{
            const about = await Contact.findOneAndUpdate(
                
                    {_id:req.body._id},
                    req.body,
                    {new:true}
                
            );
            res.status(200).send({
                data : contact,
                success : true ,
                message  : "contact updated successfully"
            });
    
        }catch(error){
            res.status(500).send(error);
        }
    });

    //admin login
    router.post("/admin-login",async(req,res)=>{
        try{
            const user = await User.findOne({username:req.body.username,password:req.body.password});
            user.password = "";
            if(user){
                res.status(200).send({
                    data: user,
                    success: true,
                    message:"Login successfully",
                });
            }
            else{
                res.status(200).send({
                    data: user,
                    success: false,
                    message:"Invalid username or password",
                });

            }
        }
        catch(error){
            res.status(500).send(error);

        }
    });
    


module.exports = router;