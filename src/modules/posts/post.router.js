import express from 'express'
import * as postController from './post.controller'
import {authjwt} from '../../services/auth.services'

const router=express.Router()
router.route('/')
      .post(authjwt,postController.createPost)

export default router;
