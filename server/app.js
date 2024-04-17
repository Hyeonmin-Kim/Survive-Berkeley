const express = require("express");
const asyncHandler = require("express-async-handler");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDB, Incident } = require("./database");

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.post("/new", asyncHandler(async (req, res) => {
    const newIncident = new Incident({
        datatime: req.body.datatime,
        location: req.body.location,
        description: req.body.description
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
    return res.json(foundCard)
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