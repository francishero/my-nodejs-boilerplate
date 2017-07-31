import express from 'express'
import * as userController from './user.controller'
//express-validation is a way to make validation as middleware
import validate from 'express-validation'
//the validation to use
import userValidation from './user.validations'
//bring passport from services
import {authLocal} from '../../services/auth.services'

const router=express.Router()

//before signup validation will be done
router.route('/signup')
      .post(validate(userValidation),userController.signUp)

//test this by using the email and password of an existing user
router.route('/login')
      .post(authLocal,userController.login)
export default router;

