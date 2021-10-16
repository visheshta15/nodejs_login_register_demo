const mongoose = require("mongoose");
const bcrypt  = require("bcrypt")
const jwt = require("jsonwebtoken");

const empSchema  = new mongoose.Schema({
    firstname : {
        type : String,
        required: true
    },
    lastname : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true,
        unique: true
    },
    gender : {
        type : String,
    },
    phone : {
        type : Number,
        required: true,
        unique: true
    },
    age : {
        type : Number,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    confirmpassword : {
        type : String,
        required: true
    },
    tokens:[{
        token:{
            type : String,
            required: true
        }
    }]
})

// generating tokens
empSchema.methods.generateAuthToken = async function(){
    try{
        // console.log("this", this)
        const token_1 = jwt.sign({_id:this._id.toString()}, process.env.SECRECT_KEY)
        this.tokens = this.tokens.concat({token:token_1})
        await this.save();
        return token_1
    }catch(error){
        res.send("the error part" + error)
        console.log("the error part" + error)
    }
}


//middleware
//converting password into has
empSchema.pre("save", async function(next){
   
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10)
        // this.confirmpassword = undefined;
    }

    next()
})

// create collection -- which is a class
const Register = new mongoose.model("Register", empSchema)

module.exports = Register;