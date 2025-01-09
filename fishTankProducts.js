const express = require('express');
const router = express.Router();
const { fishTankSchema } = require('./models/fishTankModel');
const {productConnection} = require('./db/conn');
const cors = require('cors');


router.use(cors());

const AllFishTankModel = productConnection.model("watertanks", fishTankSchema);


    router.get('/fishtanks/',async(req,res)=>{
    try {
        const data = await AllFishTankModel.find({});
        console.log("fetched tank: ", data);
        res.status(200).send(data);
              
    } catch (error) {
        console.log(error);
    }

});

router.get('/fishtanks/:_id',async(req,res)=>{
    try {
        const singleTankData = await AllFishTankModel.findById(req.params._id);
        if (!singleTankData) {
            return res.status(404).json({ error: 'Product not found' });
        }
        console.log(singleTankData);
        return res.status(200).json(singleTankData);
    } catch (error) {
        if(error){
         return  res.status(500).json({message:"interval server error"})
        }
    }
})


module.exports = router;