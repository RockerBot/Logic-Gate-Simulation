const express = require('express');
const app = express();
const cors = require('cors');//! npm install cors
var url = require("url");
var queryString = require("querystring");
var MongoClient = require("mongodb").MongoClient;

function readEntry(res, coll,db,queryObj){    
    coll.find(queryObj, {projection: {_id: 0, email: 1,}}).toArray((err, result)=>{
        if (err) throw err;
        console.log("Documents:");
        console.log(result);
        db.close();
        res.write(result.toString());
        res.end("");
    });
}



app.use(cors());
app.get('/hey', (req, res) => res.send('<p style="color:red;width:200px; height:50px;">ho!</p>'));

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


app.listen(3333,()=>{
    console.log("we in");
});//packmage.json has===> "proxy": "http://localhost:3333"
