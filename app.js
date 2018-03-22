var express    	= require('express'),
	mongoose	= require('mongoose'),
	bodyParser	= require('body-parser');
var app			= express();


//mongoose.connect("mongodb://localhost/alphbit");
app.set("view engine" , "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//Schemas 
// //  Q/A





//Routes

app.get("/",(req, res)=>{
	res.render("home.ejs",{
		title:'Home'
	});
});

app.get("/ques",(req, res)=>{
	res.render("ques.ejs",{
		title:'Q/A '
	});
});

app.post("/ques/new",(req,res) =>{
	res.render("ques");
})


app.listen(process.env.PORT || 8000 , ()=>{
	console.log(`Server is listening on 8000`);
})
