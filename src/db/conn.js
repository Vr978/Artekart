const mongoose = require('mongoose');

const URL = "mongodb+srv://vrajchaudhary05:Supersecretpassword@artekart.lerhncn.mongodb.net/?retryWrites=true&w=majorty";
mongoose.set('strictQuery', false);

//  Creating a database
mongoose.connect(URL,{
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connection Created");
}).catch((err)=>{
    console.log("Error: " + err);
});
