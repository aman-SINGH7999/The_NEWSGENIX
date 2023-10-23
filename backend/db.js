const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MOONGO_URI, {
            // useNewUrIParser : true,
            useUnifiedTopology : true,
            // useFindAndModify : true,
        });
        console.log("Mongodb connected!   =   ", connect.connection.host );
    }catch(err){
        // console.log("-----------------------------",err.message);
        process.exit();
    }
}
module.exports = connectDB;