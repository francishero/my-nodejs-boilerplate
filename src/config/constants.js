
 const devConfig={
   MONGO_URL:'mongodb://localhost:27017/my-node-boiler',
   JWT_SECRET:'mysecretlol'
 }
 const testConfig={
     MONGO_URL:'mongodb://localhost:27017/my-node-boiler-test'
 }
 const prodConfig={
     MONGO_URL:'mongodb://localhost:27017/my-node-boiler-prod'
 }
 const defaultConfig={
   PORT: process.env.PORT || 8005
 }
 function envConfig(env){
   switch(env){
     case 'development':
        return devConfig
      case 'test':
        return testConfig
      default:
        return prodConfig

   }
 }
 export default{
   ...defaultConfig,
   ...envConfig(process.env.NODE_ENV)
 }
