import express from 'express'
import constants from './config/constants'
import './config/databases'
import middlewareConfig from './config/middlewares'
import apiRoutes from './modules' //javascript will know to get index.js
const app=express();

//middleware
middlewareConfig(app)

//routes
app.get('/',(req,res)=>{
  res.json({data:'hello'})
})
apiRoutes(app)

const PORT=constants.PORT
app.listen(PORT,(err)=>{
  if(err){
    console.log(err)
  }
  console.log(`Server running on port ${PORT}
              ********************************
              running on ${process.env.NODE_ENV}
  `)
})

