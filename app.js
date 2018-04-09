var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    session = require("express-session"),

    passportLocalMongoose = require("passport-local-mongoose");
var app = express();

mongoose.connect("mongodb://skpuri:skpuri@ds255768.mlab.com:55768/yelp_camp")
//mongoose.connect("mongodb://localhost/alphbit");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

// User Schemas
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
UserSchema.plugin(passportLocalMongoose);
var User = mongoose.model("User", UserSchema);



// Passport Coniguration
app.use(session({
    secret: "ShubhamKumarPuri",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
app.use((req, res, next) => {
    res.locals.currentUser = req.user;

    next();
});

//Project Schema
var ProjectSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    title: String,
    type: String, //android, ai ,ml , web
    technology: String, //php ,node etc
    shortDesc: String, //breif
    body: String, //complete Descriptio of the project
    views: {
        type: Number,
        default: 0
    },
    interested: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }],
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



//Event Schemas
var EventSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    title: String,
    EventType: String, //
    startTime: String,
    endTime: String,
    breif: String,
    link: String,
    views: {
        type: Number,
        default: 0
    },
    interested: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }],
    posted: {
        type: Date,
        default: Date.now
    }

});
var Event = mongoose.model("Events", EventSchema);

// //  Q/A





//Routes

app.get("/", (req, res) => {

    console.log(req.user);
    Project.find({}).sort({
        posted: -1
    }).limit(4).exec((err, Projects) => {

        if (err) {
            console.log("ERROR!");
        } else {
            Event.find({}).sort({
                posted: -1
            }).limit(4).exec((err, Events) => {

                if (err) {
                    console.log("ERROR!");
                } else {
                    res.render("home", {
                        Projects: Projects,
                        Events: Events,
                        title: "Alphabit"
                    });
                }
            });
        }
    });


});
app.get("/roadmap", (req, res) => {
    res.render("description.ejs", {
        title: 'RoadMap '
    });
});
app.get("/ques", (req, res) => {
    res.render("ques.ejs", {
        title: 'Q/A '
    });
});

app.post("/ques/new", (req, res) => {
    res.render("ques");
});

// projects

app.get('/projects/new', isLoggedIn, (req, res) => {
    res.render("projects/new.ejs", {
        title: "New Project"
    });
});

app.post("/projects", (req, res) => {
    // req.body.project.author = req.user;
    // console.log(req.body.project.author);
    Project.create(req.body.project, (err, newProject) => {
        if (err) {
            res.render("new");
        } else {
            newProject.author = req.user;
            newProject.save();
            //redirect to index
            res.redirect("/");
        }
    })
});

app.get('/projects/:id', (req, res) => {
    Project.findById(req.params.id, (err, foundProject) => {
        if (err) {
            console.log("problem");
            // res.redirect("/projects");
        } else {
            foundProject.views++;

            foundProject.save();
            // console.log(foundProject);
            res.render("projects/show.ejs", {
                project: foundProject,
                title: "Project"
            });
        }
    });
});
app.get('/projects', (req, res) => {
    Project.find({}).sort({
        posted: -1
    }).exec((err, Projects) => {

        if (err) {
            console.log("ERROR!");
        } else {
            res.render("projects/index.ejs", {
                Projects: Projects,
                title: "All Projects"
            });
        }
    });
});
app.get('/projects/:id/addInterested', isLoggedIn, (req, res) => {
    Project.findById(req.params.id, (err, foundProject) => {
        if (err) {
            console.log("problem");
            // res.redirect("/projects");
        } else {
            console.log("working");
            //  res.redirect("/projects/:id");
            foundProject.interested.push(req.user);

            foundProject.save();
            res.redirect("/projects/" + foundProject._id);
            // res.render("projects/show.ejs", {
            //   project: foundProject,
            //   title: "Project"
            // });
        }
    });
});


//Event

app.get('/events/new', isLoggedIn, (req, res) => {
    res.render("events/new.ejs", {
        title: "New Event"
    });
});

app.post("/events", (req, res) => {
    //req.body.event.author = req.user;
    console.log(req.body.event.author);
    Event.create(req.body.event, (err, newEvent) => {
        if (err) {
            res.render("new");
        } else {
            newEvent.author = req.user;
            newEvent.save();
            //redirect to index
            res.redirect("/events");
        }
    })
});

app.get('/events/:id', (req, res) => {
    Event.findById(req.params.id, (err, foundEvent) => {
        if (err) {
            console.log("problem");
            // res.redirect("/projects");
        } else {
            foundEvent.views++;
            foundEvent.save();
            // console.log(foundProject);
            res.render("events/show.ejs", {
                event: foundEvent,
                title: "Event"
            });
        }
    });
});
app.get('/events', (req, res) => {
    Event.find({}).sort({
        posted: -1
    }).exec((err, Events) => {

        if (err) {
            console.log("ERROR!");
        } else {
            res.render("events/index.ejs", {
                Events: Events,
                title: "All Events"
            });
        }
    });
});
app.get('/events/:id/addInterested', isLoggedIn, (req, res) => {
    Event.findById(req.params.id, (err, foundEvent) => {
        if (err) {
            console.log("problem");
            // res.redirect("/projects");
        } else {
            console.log("working");
            //  res.redirect("/projects/:id");
            foundEvent.interested.push(req.user);

            foundEvent.save();
            res.redirect("/events/" + foundEvent._id);
            // res.render("projects/show.ejs", {
            //   project: foundProject,
            //   title: "Project"
            // });
        }
    });
});



//=======================
// Auth Routes
//====================

//show register form

app.get("/register", (req, res) => {
    res.render("register", {
        title: "Register",
        msg: "5"
    });
});
//handle sign up logic
app.post("/register", (req, res) => {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.render("register", {
                title: "Register",
                msg: err
            });
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/");
        });
    });
});

// show login form
app.get("/login", (req, res) => {
    res.render("login", {
        title: "Register",
    });
});
app.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }),
    (req, res) => {

    });
//logout
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});


app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is listening on 8000`);
})
