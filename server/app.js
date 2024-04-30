const express = require("express");
const asyncHandler = require("express-async-handler");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv')
const { connectToDB, Incident } = require("./database");

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.post("/new", asyncHandler(async (req, res) => {
    const newIncident = new Incident({
        coords: { lng: req.body.lng, lat: req.body.lat },
        address: { abbreviated: req.body.abbreviated, full: req.body.full},
        title: req.body.title,
        tags: req.body.tags,
        detail: req.body.detail, 
        createdAt: req.body.createdAt
    })
    await newIncident.save()
    res.status(201).json(newIncident)
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
    return res.json(deleteIncident)
}))

async function start() {
    await connectToDB()

    return app.listen(3000, () => {
        console.log("Listening on port 3000")
    })
}

if (require.main === module) {
    start().catch((err) => console.error(err));
}