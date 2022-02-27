require('dotenv').config()
const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const UserService = require("./database/services/userService.js");
const dbConnect = require("./database/connection/dbConnect.js");
const dbConfig = require("./config/dbConfig");


const app = express();
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(5000, () => {
    console.log("Server running on 5000");
})

dbConnect(dbConfig)

app.post("/createUser", async (req, res, next) => {
    console.log(req.body);
    const {user_id, first_name, last_name, birthday, password, gender_id} = req.body
    const userSrv = new UserService(dbConfig.mysql.client);
    const newUser = await userSrv.createUser(user_id, first_name, last_name, birthday, password, gender_id);
    if(newUser.type === "ERROR") {
        res.send(newUser.msg); 
    } else {
        res.send(newUser);
    }
})

app.get("/fetchAllUsers", async (req, res, next) => {
    const userSrv = new UserService(dbConfig.mysql.client);
    const users = await userSrv.fetchAll();
    if(users.type === "ERROR") {
        res.send(users.msg); 
    } else {
        console.log(users);
        res.send(users);
    }
})

app.post("/fetchOne", async (req, res, next) => {
    const {user_id} = req.body;
    const userSrv = new UserService(dbConfig.mysql.client);
    const user = await userSrv.findOne(user_id);
    if(user.type === "ERROR") {
        res.send(user.msg); 
    } else {
        res.send(user);
    }
})

app.post("/updateUser", async (req, res, next) => {
    const {user_id, first_name, password, last_name, birthday, gender_id} = req.body;
    const userSrv = new UserService(dbConfig.mysql.client);
    const user = await userSrv.updateUser(user_id, first_name, last_name, birthday, gender_id, password);
    if(user.type === "ERROR") {
        res.send(user.msg); 
    } else {
        res.send(user);
    }
})

app.post("/deleteUser", async (req, res, next) => {
    const {user_id} = req.body;
    const userSrv = new UserService(dbConfig.mysql.client);
    const user = await userSrv.deleteUser(user_id);
    if(user.type === "ERROR") {
        res.send(user.msg); 
    } else {
        res.send(user);
    }
})