const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const mongo = process.env.DATABASE_URL;
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on("connected", () => {
    console.log("DB: Connected")
});

app.listen(PORT, () => {
    console.log('API is now listening on port ' + PORT)
});