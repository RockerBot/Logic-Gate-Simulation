const express = require('express');
const app = express();
const cors = require('cors');//! npm install cors
var url = require("url");
var queryString = require("querystring");
var MongoClient = require("mongodb").MongoClient;


app.use(cors());
app.get('/hey', (req, res) => res.send('<p style="color:red;width:200px; height:50px;">ho!</p>'));
// app.get('/pls', (req, res) => res.send("index.js"));

app.get('/loginInfo', (req,res)=>{
    res.getHeaders()
    // var urlObj = url.parse(req.url);
    // var queryObj = queryString.parse(urlObj.query);
    // res.send("Recieved Login");
    const checkmail = req.query.email;
    const pass = req.query.pass;
    
    MongoClient.connect("mongodb://localhost:27017", function(err, db) {
        if (err) throw err;

        var collection = db.db("LogicGateSimulation").collection("LoginInfo");
        collection.find({email: checkmail}).toArray((err,result)=>{
            if (err) console.log("ERROR =(");
            try{
                // const res_email = result[0].email;
                const res_pass = result[0].pass;
                if(res_pass === pass){
                    // res.write(`1:${checkmail}`);
                    // res.end();
                    db.close();
                    console.log("CORRECT PASSWORD...REDIRECTING")
                    
                    // res.send("GG")
                    // res.redirect('localhost:3000')
                    // fetch('localhost:3000')
                }else{
                    var msg="INCORRECT PASSWORD";
                    // res.write(`0:${msg}`);
                    // res.end();
                    db.close();
                    console.log("CORRECT EMAIL WRONG PASSWORD :) ");
                }
            }catch{
                console.log("NO DATA FOUND :)\n making an entry");
                collection.insertOne({email:checkmail,pass:pass},(err, result)=>{
                    if(err)throw err;
                    // res.write(`1:${checkmail}`);
                    // res.end();
                    db.close();
                })
            }
                
        })

        // try{
        //     if (req.method == "GET")
        //         readEntry(res,coll,db,checkmail,pass);
        // }catch(errrr){console.log(errrr);}
        
    });
});

const PORT=3333;
app.listen(PORT,()=>{
    console.log("we in\nPORT:",PORT);
});//packmage.json has===> "proxy": "http://localhost:3333"


// // Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/build')));

// // Handle GET requests to /api route
// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// // All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });
