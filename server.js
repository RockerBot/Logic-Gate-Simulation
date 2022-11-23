const express = require('express');
const app = express();
const cors = require('cors');//! npm install cors
var url = require("url");
var queryString = require("querystring");
var MongoClient = require("mongodb").MongoClient;

function readEntry(res, coll,db,queryObj){    
    console.log(queryObj);
    coll.find(queryObj).toArray((err, result)=>{
        if (err) throw err;
        console.log("Documents:");
        console.log(result);
        db.close();
        // res.write(result.toString());
        // res.end("");
    });
}



app.use(cors());
app.get('/hey', (req, res) => res.send('<p style="color:red;width:200px; height:50px;">ho!</p>'));
// app.get('/pls', (req, res) => res.send("index.js"));

app.get('/LoginInfo', (req,res)=>{
    var urlObj = url.parse(req.url);
    var queryObj = queryString.parse(urlObj.query);

    MongoClient.connect("mongodb://localhost:27017", function(err, db) {
        if (err) throw err;

        var dbo = db.db("LogicGateSimulation");
        var coll = dbo.collection("LoginInfo");
        try{
            if (req.method == "GET")readEntry(res,coll,db,queryObj);
            // else if (req.method == "POST")createEntry(res,coll,db,queryObj);
            // else if (req.method == "PUT")updateEntry(res,coll,db,queryObj);
            // else if (req.method == "DELETE")removeEntry(res,coll,db,queryObj);
        }catch(errrr){console.log(errrr);}
        
    });
});

const PORT=3333;
app.listen(PORT,()=>{
    console.log("we in, port:",PORT);
});//packmage.json has===> "proxy": "http://localhost:3333"


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
