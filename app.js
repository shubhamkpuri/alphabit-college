var express    	= require('express'),
	mongoose	= require('mongoose'),
	bodyParser	= require('body-parser');
var app			= express();


mongoose.connect("mongodb://localhost/alphbit");
app.set("view engine" , "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//Schemas 
 
 var ProjectSchema = new mongoose.Schema({
    // author:{
    //     id:{
    //         type : mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     },
    //     username : String
    // },
    title: String,
    type:String,
    technology:String,
    shortDesc: String,
    body: String,
    posted: {
        type: Date,
        default: Date.now
    }
   
});
var Project = mongoose.model("Projects", ProjectSchema);
// Project.create({
//  	title: "Second Blog",
//  	shortDesc: "This is again a test",
//  	body:" This is the again blog post <h2> I'm excited to see how it is goona look",
 	
//  });
// //  Q/A





//Routes

app.get("/",(req, res)=>{


	 Project.find({}).sort({posted: -1}).limit(4).exec((err, Projects) => {

        if (err) {
            console.log("ERROR!");
        } else {
            res.render("home", {
                Projects: Projects,
                title:"Alphabit"
            });
        }
    });

	
});

app.get("/ques",(req, res)=>{
	res.render("ques.ejs",{
		title:'Q/A '
	});
});

app.post("/ques/new",(req,res) =>{
	res.render("ques");
});

// projects

app.get('/projects/new',(req,res) =>{
	res.render("projects/new.ejs",{
		title:"New Project"
	});
});

app.post("/projects", (req, res) => {
   // req.body.blog.author = req.user;
   
    Project.create(req.body.project, (err, newProject) => {
                if (err) {
                    res.render("new");
                } else {
                  
                   newProject.save();
                    //redirect to index
                   res.redirect("/");
                }
            })
        });

app.get('/projects/:id',(req,res)=>{
	Project.findById(req.params.id, (err, foundProject) => {
        if (err) {
        	console.log("problem");
            // res.redirect("/projects");
        } else {
           console.log(foundProject);
            res.render("projects/show.ejs", {
                project: foundProject, 
                title:"Project"
            });
        }
    });
});
app.get('/projects',(req,res)=>{
	 Project.find({}).sort({posted: -1}).exec((err, Projects) => {
	 	
        if (err) {
            console.log("ERROR!");
        } else {
            res.render("projects/index.ejs", {
                Projects: Projects,
                title:"All Projects"
            });
        }
    });
});
app.listen(process.env.PORT || 8000 , ()=>{
	console.log(`Server is listening on 8000`);
})
