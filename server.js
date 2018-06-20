var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var PORT = process.env.PORT || 3000;


var reservations = [];

function Reservation(name, num, email, id){
    this.customerName = name;
    this.phoneNumber = num;
    this.customerEmail = email;
    this.customerID = id;
};

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", (req, res) =>{
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/reservations", (req,res) =>{
    res.sendFile(path.join(__dirname, "reservations.html"));
});

app.get("/api/reservations", (req,res)=>{
    return res.json(reservations);
});

app.post("/api/reservations", (req, res)=>{
    console.log("Posting");
    var reservation = req.body;
    // newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(reservation);
    var newres = new Reservation(reservation.customerName, reservation.phoneNumber, reservation.customerEmail, reservation.customerID);
    console.log(newres);

    reservations.push(newres);
    res.json(newres);
});

app.listen(PORT, function(){
    console.log("App listening on port " + PORT);
})