
import Joi from 'joi'
export const passwordRegex=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
/* password must start with a capital letter and end with a number */

export default{
  //the controller to do validation on
  signup:{
    email:Joi.string().email().required(),
    password:Joi.string().regex(passwordRegex).required(),
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    userName:Joi.string().required()
  }
}
