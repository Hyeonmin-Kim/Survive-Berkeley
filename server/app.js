const express = require("express");
const asyncHandler = require("express-async-handler");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require("socket.io");
const { connectToDB, Incident } = require("./database");

dotenv.config();

const app = express();
var currSocket;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

async function start() {
    await connectToDB();
    return app.listen(3000, () => {
        console.log("Listening on port 3000")
    })
}

if (require.main === module) {
    start()
    .then((server) => {
        const io = new Server(server, {
            cors: {
                origin: "http://localhost:5173",
                methods: ["GET", "POST"]
            }
        });
        io.on('connection', (socket) => {
            console.log('a user connected');
            currSocket = socket;
        });
    })
    .catch((err) => console.error(err));
}

app.post("/new", asyncHandler(async (req, res) => {
    const newIncident = new Incident({
        coords: { lng: req.body.coords.lng, lat: req.body.coords.lat },
        address: { abbreviated: req.body.address.abbreviated, full: req.body.address.full},
        title: req.body.title,
        tags: req.body.tags,
        detail: req.body.detail, 
        createdAt: req.body.createdAt,
        comments: []
    })
    await newIncident.save()
    const allIncidents = await Incident.find()
    currSocket.emit('incidentUpdate', allIncidents);
    res.status(201).json(newIncident)
}))

app.post("/:id/new/comment", asyncHandler(async (req, res) => {
    const newComment = new Comment({
        incidentId: req.params.id,
        contents: req.body.contents,
        createdAt: req.body.createdAt,
        reaction: req.body.reaction
    })
    
    const currIncident = await Incident.findById(req.params.id)
    currIncident.comments.push(newComment._id)

    await newComment.save()
    res.status(201).json(newIncident)
}))

app.get("/:id/comments", asyncHandler(async (req, res) => {
    const foundIncident = await Incident.findById(req.params.id)
    const commentsJson = []
    for (const comment of foundIncident.comments) {
        const currComment = await Comment.findById(comment)
        commentsJson.push(currComment)
    }

    return res.status(200).json(commentsJson)
}))

app.get("/incidents", asyncHandler(async (req, res) => {
    const allIncidents = await Incident.find()
    return res.json(allIncidents)
}))

app.get("/incident/:id", asyncHandler(async (req, res) => {
    const id = req.params.id
    const foundIncident = await Incident.findById(id)
    return res.json(foundIncident)
}))

app.get("/delete/:id", asyncHandler(async (req, res) => {
    const id = req.params.id
    const deleteIncident = await Incident.findByIdAndDelete(id)
    const allIncidents = await Incident.find()
    currSocket.emit('incidentUpdate', allIncidents);
    return res.json(deleteIncident)
}))

// TODO: remove this
app.get("/deleteAll", asyncHandler(async (req, res) => {
    await Incident.deleteMany({});
    currSocket.emit('incidentUpdate', []);
    return res.status(200).send("OK");
}))