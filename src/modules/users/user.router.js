import {Router} from 'express'
import * as userController from './user.controller'
const routes=new Router()

routes.get('/signup',userController.signUp)
export default routes;
