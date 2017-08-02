import Joi from 'joi'

export default{
  createPost:{
    body:{
      title:Joi.string().min(3).required(),
      text:Joi.string().min(3).required()
    }
  },
  /*==========================
  validate the updated fields but not required
  =============================*/
updatePost:{
    body:{
      title:Joi.string().min(3),
      text:Joi.string().min(3)
    }
  }
}



