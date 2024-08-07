import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async ()=>{
    const connectionState = mongoose.connection.readyState;
    if(connectionState===1){
        console.log("Already Connected");
        return
    }
    if(connectionState===2){
        console.log("Connecting...");
        return
    }
    try{
        await mongoose.connect(MONGODB_URI,{
            dbName: "restAPI",
            bufferCommands: false
        })
        console.log("Connected");
    }
    catch(err){
        console.log(err);
        throw new Error("Error connecting", err);
    }
}

export default connect;