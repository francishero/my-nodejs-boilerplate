import mongoose,{Schema} from 'mongoose'
import validator from 'validator'
import uniqueValidator from 'mongoose-unique-validator'
import {passwordRegex} from './user.validations'
//encrypt the user password and then use compareSync to compare
import {hashSync,compareSync} from 'bcrypt-nodejs'
//now we need to send a token to the user
import jwt from 'jsonwebtoken'
//we need the JWT_SECRET from the config
import constants from '../../config/constants'

const userSchema=new Schema({
  email:{
    type:String,
    unique:true,
    required:[true,'email is required'],
    trim:true,
    validate:{
      validator(email){
        return validator.isEmail(email)
      },message:'{VALUE} is not a valid email'
    }
  },
  firstName:{
    type:String,
    required:[true,'firstname is required'],
    trim:true
  },
  lastName:{
    type:String,
    required:[true,'lastname is required'],
    trim:true
  },
  userName:{
    type:String,
    required:[true,'username is required'],
    trim:true
  },
  password:{
    type:String,
    required:[true,'password is required'],
    trim:true,
    minlength:[6,'password must be longer than 6 letters'],
    validate:{
       validator(password){
         return passwordRegex.test(password)
       },message:'{VALUE} is not a valid password'
    }
  },
},{timestamps:true},{toJSON:{virtuals:true}});
//plugins
userSchema.plugin(uniqueValidator,{
  message:'{VALUE} must be unique'
})
//this is called before the save method is called
userSchema.pre('save',function(next){
  /*we use function here so we have access to  `this`*/
  /* `this` represents the current user
  /* only encrpt the user password if it has changed */
  if(this.isModified('password')){
    this.password=this._hashPassword(this.password)
    return next()
  }
  return next()
})

userSchema.methods={
  //encrypt the users password and return it
  _hashPassword(password){
    return hashSync(password)
  },
  authenticateUser(password){
    //compare the password from the frontend with the one in the db
    return compareSync(password,this.password)
  },
  createToken(){
    return jwt.sign({_id:this._id},constants.JWT_SECRET)
  },
/*TODO fix */
  toJSON(){
    return{
      _id:this._id,
      userName:this.userName,
      token:`JWT ${createToken()}`
    }
  },
}
export default mongoose.model('User',userSchema)

