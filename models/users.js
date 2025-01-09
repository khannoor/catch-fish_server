const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    phone: Number,
    password: String,
    ConfirmPassword: String,
    tokens:[
        {
            token: String
        }
    ]
})

// we are hashing the password

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password,12)
        this.ConfirmPassword = bcrypt.hashSync(this.ConfirmPassword,12)
    }
    next();
});

// we are generating token

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id : this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch (err){
        console.log(err);
    }
}



const UserModel = mongoose.model('Signup',userSchema);

module.exports = UserModel