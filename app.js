// jshint esversion: 6

const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const { options } = require("request");
const res = require("express/lib/response");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req,res){
    
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const Email=req.body.email;

    const data={
         members:[
             {
                 email_address: Email,
                 status: "subscribed",
                 merge_fields: {
                      FNAME: firstName,
                      LNAME: lastName
                 }
             }
         ]
    };

    const jsonData=JSON.stringify(data);

    const url="https://us14.api.mailchimp.com/3.0/lists/585138258b";

    const options={
        method: "POST",
        auth: "jaswant04:11f11489cfae9dfbbbe421569551905c-us14"
    }

    const request=https.request(url, options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html")
        }


        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});


app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000.");
});


// 31bcca7d14811f202b5a1e9ac3751f5d-us14 

// 585138258b

//API Keys
//11f11489cfae9dfbbbe421569551905c-us14

//585138258b