import userRoutes from './users/user.router'

export default app=>{
  app.use('/api/v1/users',userRoutes)
}