const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const dbConnectionUri = `mongodb+srv://${process.env.SECRET_USERNAME}:${process.env.SECRET_PASSWORD}@cluster0.abixrqy.mongodb.net/`;
const dbName = "survive-berkeley";

const incidentSchema = new mongoose.Schema({
    coords: { lng: Number, lat: Number },
    address: { abbreviated: String, full: String},
    title: String,
    tags: [],
    detail: String, 
    createdAt: String,
    comments: []
})

const commentSchema = new mongoose.Schema({
    incidentId: mongoose.Schema.Types.UUID,
    contents: String,
    createdAt: String,
    reaction: Boolean
})

const Comment = mongoose.model('Comment', commentSchema)

const Incident = mongoose.model('Incident', incidentSchema);

async function connectToDB() {
    await mongoose.connect(dbConnectionUri, { dbName });
    console.log("Successfully connected to MongoDB");
}

module.exports = { connectToDB, Incident, Comment };