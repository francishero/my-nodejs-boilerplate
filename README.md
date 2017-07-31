##createPost 
For a user to create a post they must be logged in.
So first go to /api/v1/users/signup and signup.
 go to /api/v1/users/login use your email and password to login.
a token will be sent to you.
go to /api/v1/posts and using postman send 
'authorization':'<your token here>' and whatever is required to create a post 
for this to work please append `JWT` before your token 
