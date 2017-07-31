import User from './user.model'

 export async function signUp(req,res){
   try{
        const user= await User.create(req.body)
        res.status(200).json({data:user})

   }catch(err){
      res.status(500).json(err)
   }
 }

 export async function login(req,res,next){
   //passport has put the user in `req.user`
   res.status(200).json(req.user) //if it doesnt return token use req.user.createToken()
   return next()
 }
