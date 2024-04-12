const mongoose = require('mongoose')

const dbConnectionUri = 'mongodb+srv://hoangduy2003:hoangduy03@cluster0.abixrqy.mongodb.net/';
const dbName = "survive-berkeley";

const incidentSchema = new mongoose.Schema({
    datetime: Date,
    location: {type: String, coordinates: [Number]},
    description: String
})

const Incident = mongoose.model('Incident', incidentSchema);

async function connectToDB() {
    await mongoose.connect(dbConnectionUri, { dbName });
    console.log("Successfully connected to MongoDB");
}

module.exports = { connectToDB, Incident };