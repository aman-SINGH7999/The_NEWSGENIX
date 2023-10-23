const NewsData = require('../models/dataModel');

const allData = async (req,res)=>{
    const mydata = await NewsData.find({});
    if(mydata){
        let data = mydata.reverse();
        res.status(200).json({
            success:true,
            data,
        })
    }else{
        res.status(400).json({success:false, message:"Something went wrong! Please try after some time."})
    }
}

const getnews = async(req,res)=>{
    // console.log("server ", req.headers)
    const newsId = req.headers.newsid;
    // console.log("news id : ",newsId)
    
    const data = await NewsData.findOne({_id : newsId});
        if(data){
            return res.status(200).json({
                success : true,
                data,
            });
        }else{
            return res.status(400).json({success:false, message:"Something Went Wrong, Please try after some time."});
        }
}

module.exports = {allData,getnews}