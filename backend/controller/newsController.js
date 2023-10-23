const NewsData = require('../models/dataModel');

const addNews = async (req,res)=>{
    const {reporter, title, type, description, file, news, braking} = req.body;
    if(!reporter ||!title || !type || !description || !file || !news || !braking){
        return res.status(400).json({success:false, message:"Please Enter All The Fiedls!"});
    }
    const newsExists = await NewsData.findOne({title});
    if(newsExists){
        return res.status(400).json({success:false, message:"News is Already Added"});
    }
    const newsData = await NewsData.create({
        reporter,
        title,
        type,
        description,
        file,
        news,
        braking,
    })
    if(newsData){
        return res.status(200).json({success:true,message:"News added successfully!",newsData});
    }else{
        return res.status(400).json({success:false, message:"Something Went Wrong, Please try after some time."});
    }
}

const getnews = async(req,res)=>{
    const newsId = req.headers.newsid;
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

const updateNews = async (req,res)=>{
    const {id, reporter, title, type, description, file, news, braking} = req.body;
    if(!id || !reporter ||!title || !type || !description || !file || !news || !braking){
        return res.status(400).json({success:false, message:"Please Enter All The Fiedls!"});
    }
    try{
        const updatedData = await NewsData.findByIdAndUpdate({_id : id},{
            title,
            type,
            description,
            news,
            braking,
        });
        if(updatedData){
            return res.status(200).json({success:true, message:"Updated successfully!",updatedData});
        }else{
            return res.status(400).json({success:true, message:"Something Went Wrong, Please try after some time."});
        }
    }catch(err){
        return res.status(400).json({success:true, message:"Something Went Wrong, Please try after some time."});
    }
}

const deleteNews = async (req,res)=>{
    const id = req.headers.id;
    const data = await NewsData.findByIdAndDelete({_id : id});
    if(data){
        const data2 = await NewsData.find({});
        if(data2){
            return res.status(200).json({
                success : true,
                data : data2,
                message : "News Deleted successfully"
            });
        }else{
            return res.status(400).json({success:false, message:"Something Went Wrong, Please try after some time."});
        }
    }else{
        return res.status(400).json({success:false, message:"Something Went Wrong, Please try after some time."});
    }
}

const allNews =  async (req,res)=>{
    // const reporter = req.headers.reporter;
    const data = await NewsData.find({});
    if(data){
        return res.status(200).json({
            success:true,
            data : data.reverse(),
        });
    }else{
        return res.status(400).json({success:false, message:"Something Went Wrong, Please try after some time."});
    }
}

module.exports = {addNews, updateNews, deleteNews ,allNews, getnews}