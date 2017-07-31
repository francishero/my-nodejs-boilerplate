import mongoose ,{Schema} from 'mongoose'
import slug from 'slug'
import uniqueValidator from 'mongoose-unique-validator'
const {ObjectId}=mongoose.Schema.Types

const postSchema=new Schema({
  title:{
    type:String,
    trim:true,
    required:[true,'the title is required'],
    minlength:[3,'a title must be longer'],
    unique:true //so we slugify it
  },
  text:{
    type:String,
    trim:true,
    required:[true,'post text is required'],
    minlength:[3,'post text must be longer']
  },
  slug:{
    type:String,
    trim:true,
    lowercase:true,
  },
  user:{
    type:ObjectId,
    ref:'User'
  },
  favoriteCount:{
    type:Number,
    default:0
  },
},{timestamps:true});
//plugins
postSchema.plugin(uniqueValidator,{
  message:`{VALUE} must be unique`
})

//hooks
postSchema.pre('save',function(next){
  /* `function` is used here so we can have `this` context */
  this._slugify()
  next()
})
//methods
postSchema.methods={
  _slugify(){
    this.slug=slug(this.title)
  }
}
//statics are like static methods on a class
postSchema.statics={
  createPost(args,user){
    //internally we use the create method
    return this.create({
      ...args,
      user,
    })
  }
}

export default mongoose.model('Post',postSchema);
