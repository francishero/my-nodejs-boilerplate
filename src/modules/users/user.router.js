import express from 'express'
import * as userController from './user.controller'

const router=express.Router()

router.route('/signup')
      .post(userController.signUp)
export default router;
