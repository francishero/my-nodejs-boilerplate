import express from 'express'
const app=express();

const PORT=process.env.PORT || 4000 
app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}
              ********************************
              running on ${process.env.NODE_ENV}
  `)
})