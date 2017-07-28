import mongoose,{Schema} from 'mongoose'
import validator from 'validator'
import {passwordRegex} from './user.validations'
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
  }
})
export default mongoose.model('User',userSchema)
