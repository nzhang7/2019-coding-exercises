var express = require("express");
var bodyParser = require("body-parser");
var Pusher = require("pusher");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var pusher = new Pusher({ appId: "742097", key: "7794189a05d9c8232c58", secret: "471b0b8f28b024c219a9", cluster: "us3" });

app.post("/message", function(req, res){
	var message = req.body.message;
	pusher.trigger("public-chat", "message-added", { message });
	res.sendStatus(200);
});

app.get("/", function(req,res){
	res.sendFile("/public/index.html", { root:__dirname });
});

app.use(express.static(__dirname + "/public"));

var port = process.env.PORT || 5000;
app.listen(port, function(){
	console.log(`app listening on port ${port}!`)
});