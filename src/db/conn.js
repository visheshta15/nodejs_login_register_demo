// to connect db to express application
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/InfyRegistration", {useNewUrlParser: true,
useUnifiedTopology: true}
).then(()=>{
    console.log(`connection is successfull`)
}).catch((e)=>{
    console.log(`no connection`)
})