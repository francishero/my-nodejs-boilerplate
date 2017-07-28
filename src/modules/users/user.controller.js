import User from './user.model'

 export async function signUp(req,res){
   try{
        const user= await User.create(req.body)
        res.status(200).json({data:user})

   }catch(err){
      res.status(500).json(err)
   }
 }