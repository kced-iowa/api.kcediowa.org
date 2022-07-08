const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const MONGO = process.env.DATABASE_URL;
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

// routes
const membersRouter = require("./routes/about/members")
    app.use('/api/members', membersRouter)
const aboutRouter = require("./routes/about/about")
    app.use('/api/about', aboutRouter)

app.listen(PORT, () => {
    console.log('API is now listening on port ' + PORT)
});

mongoose.connect(MONGO);
const db = mongoose.connection;
db.on('error', () => {
    console.log('DB: unknown error')
})
db.on('connected', () => {
    console.log('DB: connected')
});