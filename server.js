// Define app using express
const express = require("express")
const app = express()
// Require database SCRIPT file
const db = require("./database.js")
// Require md5 MODULE
const md5 = require("md5")
//Require cors module
const cors = require("cors")
// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//USE CORS
app.use(cors());
// Set server port
var HTTP_PORT = 5000
// Start server
const server = app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
    res.json({"message":"Your API works! (200)"});
	res.status(200);
});

// Define other CRUD API endpoints using express.js and better-sqlite3
// CREATE a new user (HTTP method POST) at endpoint /app/new/
app.post("/app/new/user", (req,res,next) => {
	console.log(req.body)
	const stmt = db.prepare("INSERT INTO newuserinfo (user, email, pass, accountType) VALUES (?, ?, ?, ?)");
	const info = stmt.run(req.body.user, req.body.email, md5(req.body.pass), req.body.accountType );
	//res.status(201).json({"message": info.changes+ " record created: ID " + info.lastInsertRowid + " (201)"});
	res.redirect('http://127.0.0.1:5500/accountInfo.html');
});

//LOGIN
app.post("/app/user/login/", (req,res,next) => {
	console.log(req.body)
	const stmt = db.prepare("SELECT * FROM newuserinfo WHERE user = ? AND pass = ?" );
	const info = stmt.get(req.body.username, md5(req.body.password));
	console.log(info)
	if (!info){
		res.redirect('http://127.0.0.1:5500/index.html')
	}
	res.redirect('http://127.0.0.1:5500/accountInfo.html');
});

// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM newuserinfo").all();
	res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id
app.get("/app/user/:id", (req,res) => {
	const stmt = db.prepare("SELECT * FROM newuserinfo WHERE id = ?");
	const info = stmt.get(req.params.id);
	res.status(200).json({"id": info.id,"user": info.user,"pass": info.pass, "email": info.email});
});
// UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:id
app.patch("/app/update/user/:id", (req,res) => {
	const stmt = db.prepare("UPDATE newuserinfo SET user = COALESCE(?,user), email = COALESCE(?,email), pass = COALESCE(?,pass), accountType = COALESCE(?,accountType) WHERE id = ?")
	const info = stmt.run(req.body.currentUser, req.body.currentEmail, md5(req.body.currentPass),  req.body.currentTeam, req.params.id);
	//res.status(200).json({"message": info.changes+ " record updated: ID " + req.params.id + " (200)"});
	res.redirect('http://127.0.0.1:5500/accountInfo.html');

});
// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id
app.delete("/app/delete/user/:id", (req,res) => {
	const stmt = db.prepare("DELETE FROM newuserinfo WHERE id = ?")
	const info = stmt.run(req.params.id);
	res.status(200).json({"message": info.changes+ " record deleted: ID " + req.params.id + " (200)"});
});
// Default response for any other request
app.use(function(req, res){
	res.json({"message":"Endpoint not found. (404)"});
    res.status(404);
});
