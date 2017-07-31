import Post from './post.model'

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
