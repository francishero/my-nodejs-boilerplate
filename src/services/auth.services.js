
import passport from 'passport'
import LocalStrategy from 'passport-local'
//JWT
import {Strategy as JWTStrategy ,ExtractJwt} from 'passport-jwt'
import constants from '../config/constants'
import User from '../modules/users/user.model'


const localOpts={
  //passport by default uses username and password
  //we make it use email
  usernameField:'email'
}

const localStrategy=new LocalStrategy(localOpts,async (email,password,done)=>{
  try{
    const user= await User.findOne({email})

    if(!user){
      return done(null,false)
    }else if(!user.authenticateUser(password)){
      //authenticateUser is coming from user.model Schema methods
      //it is used to compare the passwords
      return done(null,false)
    }
    return done(null,user)
  }
  catch(err){
    return done(err,false)
  }
})
//JWT
const jwtOpts={
  //passport gets token from here
  jwtFromRequest:ExtractJwt.fromAuthHeader('Authorization'),
  secretOrKey:constants.JWT_SECRET
}
 const jwtStrategy= new JWTStrategy(jwtOpts, async (payload,done)=>{
   try{
     //_id is unique
      const user= await User.findById(payload._id)
      if(!user){
        return done(null,false)
      }
      return done(null,user)
   }
   catch(err){
    return done(err,false)
   }
 })
//what strategy to be used by password
passport.use(localStrategy)
passport.use(jwtStrategy)

//we dont use sessions we use jwt
export const authLocal=passport.authenticate('local',{session:false})
export const authjwt=passport.authenticate('jwt',{session:false})
