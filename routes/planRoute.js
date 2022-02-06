const express = require('express');
const router = express.Router();

const Plan = require("../model/Plan");

// By default you can see all your Plans
router.get("/", async(req, res) => {
    // res.send("Hello");
    try{
        const plansAvail = await Plan.find().sort('updatedAt');
        // const plansAvail = await Plan.find({ userId: req.user._id }).sort('updatedAt');
        if(plansAvail.length === 0){
            res.send("No plans to show now!!");
        } else {
            res.send(plansAvail);
        }
    }catch(e){
        console.log(e);
    }
});

// Add Plans API here--
router.post("/", async(req, res) => {
    const {courseId, planPrice, discountedPrice, noOfPlanPurchased} = req.body;
    // console.log(courseId);
    // const userId = req.user._id;
    const newPlan = Plan({
        courseId,
        planPrice,
        discountedPrice,
        noOfPlanPurchased,
        // userId
    });
    newPlan.save().then((planSaved) => {
        // console.log("Plan Now Saved !!");
        res.status(200).json({Sucess: "Plan Created !!"});
    }).catch(e => {
        res.json({Error: "Some Error Occurred !!"});
    })
});

// Update Plans, API here--
router.put("/:planId", async(req, res) => {
    const planId = req.params.planId;
    // const userId = req.user._id;
    try{
        const plan = await Plan.findOneAndUpdate({ _id: planId,  userId: null}, req.body, {new: true, runValidators: true})
        res.json({Sucess: "The Plan was updated !!"});
    }catch(e){
        console.log(e);
    }
});

// Delete Plan, API here--
router.delete("/:planId", async(req, res) => {
    const planId = req.params.planId;
    // const userId = req.user._id;
    
    try{
        const delPlan = await Plan.findOneAndDelete({ _id: planId, userId: null });
        console.log("The Plan was Deleted !!");
        res.redirect("/");
    }catch(e){
        console.log(e);
    }
});

module.exports = router;