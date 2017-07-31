import express from 'express'
import * as postController from './post.controller'
import {authjwt} from '../../services/auth.services'
import validate from 'express-validation' //required to do validation on routes
import postValidation from './post.validations'

const router=express.Router()
router.route('/')
      .post(authjwt,validate(postValidation.createPost),postController.createPost)


/*=================================
getPostById returns a post with the /:id
==================================*/
router.route('/:id')
      .get(postController.getPostById)

export default router;
