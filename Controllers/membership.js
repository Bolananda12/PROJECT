const Membership = require('../Modals/membership');





exports.addMembership = async(req,res)=>{
    try{
        const {months, price} = req.body;
        const memberShip = await Membership.findOne({gym:req.gym._id,months});
        if(memberShip){
            memberShip.price = price;
            await memberShip.save();
            res.status(200).json({message:"Membership updated successfully"});
        }else{
            const nuwMembership = new Membership({price,months,gym:req.gym._id});
            await nuwMembership.save();
            res.status(200).json({message:"Membership added successfully",
                data:nuwMembership
            });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Server Error"
        })
    }
}


exports.getmembership=async(req,res)=>{
    try{
        const loggedInId = req.gym._id;
        const membership = await Membership.find({gym:loggedInId});
        res.status(200).json({
            message:"Membership fetched successfully",
            membership:membership
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Server Error"
        })
    }
}

