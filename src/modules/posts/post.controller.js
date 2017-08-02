import Post from './post.model'
import httpStatus from 'http-status'

export async function createPost(req,res){
  try{
    //static method --- req.user._id from jwt when user is logged in
    const post= await Post.createPost(req.body,req.user._id)
    res.status(201).json({
      code:0,
      data:post
    })
  }
  catch(err){
    res.status(500).json(err)
  }
}

/*=================================
getPostById returns a post with the /:id
==================================*/
export async function getPostById(req,res){
  const id=req.params.id
  try{
    const post= await Post.findById(id).populate('user')
    res.status(200).json({
      code:0,
      data:post
    })
  }
  catch(err){
    res.status(500).json(err)
  }
}

/*=================================
getPostList returns all posts
==================================*/
export async function getPostList(req,res){
  //query came like this {limit: '3'}
  const limit=parseInt(req.query.limit,0)
  const skip=parseInt(req.query.skip,0)
  try{
    const posts= await Post.list({limit,skip})
    return res.status(200).json({
      code:0,
      data:posts
    })
  }
  catch(err){
    res.status(500).json({
      code:4,
      message:err
    })
  }
}
/*=================================
updatePost updates using patch
==================================*/
export async function updatePost(req,res){
  /* find the id of the post */
  const {postId}=req.params
  /*find the actual post using the id */
  const post= await Post.findById(postId)
  /*check if the current user is the owner of the post */
  if(!post.user.equals(req.user._id))
  {
    return res.sendStatus(httpStatus.UNAUTHORIZED) //you didnt post you cant update it

  }
  /* ok lets update the fields you want */
  Object.keys(req.body).forEach(key=>{
    post[key]=req.body[key]
  })
  /*now lets not forget to save your changes to the db */
  res.status(httpStatus.OK).json( await post.save())
}
/*=================================
deletePost deletes a post with :id
==================================*/
export async function deletePost(req,res){
  const {postId}=req.params
  const post= await Post.findById(postId)
  if(!post.user.equals(req.user._id))
  {
    return res.sendStatus(httpStatus.UNAUTHORIZED)
  }
  await post.remove()
  res.sendStatus(httpStatus.OK)
}
