//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-harshal:qJZARUUqvSKbdoKJ@cluster0.mx6bkrb.mongodb.net/todolistDB", {useNewUrlParser: true});


const postSchema ={
    title : String,
    body : String
};

const Post = mongoose.model("Post",postSchema);

app.get("/",(req,res)=>{
  const find = async()=>{
    try{
        const data = await Post.find({});
        // console.log(data);
        res.render("home",{
          firstpage:homeStartingContent,
          posts:data
        })
    }catch(err){
      console.log(err)
    }
  }
  find();
})

app.get('/about',(req,res)=>{
  res.render("about",{secondpage:aboutContent});
})

app.get('/contact',(req,res)=>{
  res.render("contact",{thirdpage:contactContent});
})

app.get('/compose',(req,res)=>{
  res.render("compose");
})

app.post("/compose",(req,res)=>{
  const post = new Post({
    title : req.body.postTitle,
    body : req.body.Text1
  });

  post.save();
  res.redirect("/");
})

app.get("/posts/:postId",(req,res)=>{
  const requestedPostId = req.params.postId;
  // console.log(requestedPostId);
  const findOne = async()=>{
    try{
      const data1= await Post.findOne({_id:requestedPostId});
      res.render("post",{
        postName:data1.title,
        postContent:data1.body
      });
    }catch(err){
      console.log(err);
    }
  }
  findOne();
  
})

app.get('/delete/:postId',(req,res)=>{
  const something = req.params.postId;
  // console.log(something);
  const deleteOne = async()=>{
    try{
      Post.findByIdAndRemove(something).then(function(err){
        res.redirect("/");
        if(!err){
          console.log("Successfully deleted item");
        }else{
          console.log(err);
        }
      })
    }catch(err){
      console.log(err)
    }
  }
  deleteOne();
})


app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
