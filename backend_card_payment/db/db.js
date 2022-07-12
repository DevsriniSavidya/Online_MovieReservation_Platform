import mongoose from 'mongoose'
import colors from 'colors'
import dotenv  from 'dotenv';

dotenv.config();

 mongoose.connect(process.env.MONGO_URL,{

    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{

    console.log(`MONGODB CONNECTED SUCCESSFULLY `.cyan);
}).catch(()=>{

     
    console.log(`MONGODB CONNECTION FAIL `.red);

})