import User from './user.model'
import httpStatus from 'http-status'

 export async function signUp(req,res){
   try{
        const user= await User.create(req.body)
        res.status(200).json({data:user.toAuthJSON()})

   }catch(err){
      res.status(500).json(err)
   }
 }

 export async function login(req,res,next){
   //passport has put the user in `req.user`
   res.status(200).json(req.user) //if it doesnt return token use req.user.createToken()
   return next()
 }
export async function getAllUsers(req,res)
{
  const limit=parseInt(req.query.limit)
  const skip=parseInt(req.query.skip)
  try{
    const users= await User.list({limit,skip})
    res.status(httpStatus.OK).json({
      code:0,
      data:users
    })
  }
  catch(err)
  {
    res.status(httpStatus.BAD_REQUEST).json(err)
  }

}
