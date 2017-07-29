import userRoutes from './users/user.router'

export default app=>{
  console.log('index called')
  app.use('/api/v1/users',userRoutes)
}
