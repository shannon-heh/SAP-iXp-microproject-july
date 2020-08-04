const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const fs = require("fs");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

var users ;
var coffee;
fetchUserData().then(
    (data)=>{
        users = data.users
        coffee = getEmails();
    }
)

var admin = [
    {
        "email":"dinesh.pabbi@sap.com",
        "password":"microproject"
    },
    {
        "email":"chloey.sniecinski@sap.com",
        "password":"microproject"
    },
    {
        "email":"joie.ng@sap.com",
        "password":"microproject" 
    },
    {
        "email":"shannon.heh@sap.com",
        "password":"microproject" 
    },
    {
        "email":"shagun.varma@sap.com",
        "password":"microproject" 
    }
]

function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.points
    const bandB = b.points
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = -1;
    } else if (bandA < bandB) {
      comparison = 1;
    }
    return comparison;
  }

function findByEmail(email){
    for(i=0;i<users.length;i++){
        console.log(users[i].email)
        if(users[i].email == email){
            return users[i]
        }
    }
    return false;
}

function getEmails(email){
    emails = {}
    for(i=0;i<users.length;i++){
        emails[users[i].email] = []
    }
    return emails;
}



function findAdmin(email){
    for(i=0;i<admin.length;i++){
        console.log(admin[i].email)
        if(admin[i].email == email){
            return users[i]
        }
    }
    return false;
}

function findByLocation(location){
    return users.filter((user)=>{
        return user.location == location;
    })
}

function fetchUserData(){
    return new Promise((resolve,reject)=>{
        fs.readFile("./mock-users.json", function(err, data){
            if (err){
                reject(err);
            } else {
                let docs = JSON.parse(data);
                resolve(docs);
            }
        })
    })
}

function updateUserData(updatedData){
    fs.writeFile("./mock-users.json", updatedData, 'utf8', function callback(err, res){
        if (err){
            console.log(err);
        } else {
            console.log('Updated mock-users.json');
        }
    })
}

function findEmails(email){
    return new Promise((resolve,reject)=>{
        out = [];
    for(i=0;i<users.length;i++){
        if(users[i].email.includes(email)){
            out.push(users[i].email)
        }
    }
        resolve(out)
    })
    
}

function updatePoints(data){
    return fetchUserData()
    .then((userdata)=>{
        users = userdata.users;
        console.log("User Output")
        console.log(users);
        return new Promise((resolve,reject)=>{
            for(var i = 0; i<data.length;i++){
                for(var j = 0;j<users.length;j++){
                    if(data[i][1]==users[j].email){
                        users[j].points += parseInt(data[i][4])
                    }
                }
            }
            updateUserData(JSON.stringify({"users":users}));
            resolve(users);
        })  
    })
}

function getLocation(){
    return new Promise((resolve,reject)=>{
        var locations = ["All"];
        for(var i = 0;i<users.length;i++){
            if(!locations.includes(users[i].location)){
                locations.push(users[i].location);
            }    
        }
        resolve(locations);
    })
}

app.post("/login",(req,res)=>{
    email = req.body.email;
    password = req.body.password;
    console.log(email);
    user = findByEmail(email);
  
    if(user){
        if(user.password == password){
            res.json({
                "user":email,
                "sessionId":uuidv4()
            })
        }
        else{
            res.status(401).json({
                "error": "Wrong Password"
            })
        }    
    }
    else{
        res.status(401).json({error:"No User"})
    }
})

app.post("/coffee",(req,res)=>{
    var requestEmail = req.body.requestEmail;
    var targetEmail = req.body.targetEmail;
    coffee[targetEmail].push(requestEmail);
    res.json({"msg":"Coffee Request Sent"})
})

app.get("/coffee",(req,res)=>{
    var email = req.query.email;
    var out = coffee[email];
    res.json(out);
})

app.post("/findemails",(req,res)=>{
    console.log(req.body.query)
    findEmails(req.body.query)
    .then((out)=>{
        res.json(out)
    })
    
})

app.post("/admin",(req,res)=>{
    email = req.body.email;
    password = req.body.password;
    console.log(email);
    user = findAdmin(email);
  
    if(user){
        if(user.password == password){
            res.json({
                "user":email,
                "sessionId":uuidv4()
            })
        }
        else{
            res.status(401).json({
                "error": "Wrong Password"
            })
        }    
    }
    else{
        res.status(401).json({error:"No User"})
    }
})

app.post("/csv",(req,res)=>{
    updatePoints(req.body.users).then(
        (updated)=>{
            users = updated;
            res.json({msg:"Data Updated"});
        }
    )
    
});

app.get("/user",(req,res)=>{
    if(Object.keys(req.query).length === 0){
        out = users.sort(compare);
        res.json(out);
    }
    else{
        if(req.query.location){
            out = findByLocation(req.query.location);
            out = out.sort(compare);
            res.json(out);
        }
        else if(req.query.email){
            console.log(req.query.email)
            out = findByEmail(req.query.email);
            res.json(out);
        }
    }
    
})

app.get("/locations",(req,res)=>{
    getLocation()
    .then(
        (data)=>{
            res.json(data);
        }
    )
})




app.listen(3000,()=>{
    console.log("Json Server listening");
})
