const express=require("express");
const app=express();
const port=8080;
const path=require("path");

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");
app.use(methodOverride('_method'));




let posts=[
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"I love coding !",
    },
    {
        id:uuidv4(),
        username:"abhaykalawadiya",
        content:"I love full stack web development", 
    },
    {
        id:uuidv4(),
        username:"rko",
        content:"i love to to garba", 
    }
];

//Index route
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

//Create and New Route
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content} =req.body;
    //creating id dynamically by uuid4();
    let id=uuidv4();
    posts.push({id,username,content});
    console.log(req.body);//this can be seen after starting server by nodemon index.js
    res.redirect("/posts");//here /posts is taken as get request by default
});

//show route

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>
        id === p.id
      
    );
    // console.log(post);
    res.render("show.ejs",{post});

});


//Update route
app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newContent=req.body.content;
    console.log(newContent);
    let post=posts.find((p)=> id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
});

//edit route
app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});

//delete route
app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
    posts=posts.filter((p)=>id!=p.id);
    res.redirect("/posts");

});
app.get("/",(req,res)=>{
    res.send("server working well!");
});
app.listen(port,()=>{
    console.log("Listening to port :8080");
});