import userRoutes from './users/user.router'
import {authjwt} from '../services/auth.services'
export default app=>{
  console.log('index called')
  app.use('/api/v1/users',userRoutes)
  //just to test jwt token
  app.use('/hello',authjwt,(req,res)=>{
    res.json({
      data:'this is route is private'
    })
  })
}
