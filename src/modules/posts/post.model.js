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
},{timestamps:true},{toJSON:{virtuals:true}});
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
  },
  toJSON(){
    return{
      _id:this._id,
      title:this.title,
      text:this.text,
      createdAt:this.createdAt,
      slug:this.slug,
      favoriteCount:this.favoriteCount,
      user:this.user
    }
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
  },
  //pagination
  list({skip=0, limit=5}={}){
    //we do that to support destructing
    return this.find()
                .sort({createdAt:-1})
                .skip(skip)
                .limit(limit)
                .populate('user')
  },
  //the favoriteCount function will be on the post schema itself
  incFavoriteCount(postId)
  {
    return this.findByIdAndUpdate(postId,{$inc:{favoriteCount:1}})
  },
  decFavoriteCount(postId)
  {
    return this.findByIdAndUpdate(postId,{$inc:{favoriteCount:-1}})
  }

}

export default mongoose.model('Post',postSchema);
