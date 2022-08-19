const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const MONGO = process.env.DATABASE_URL;
const PORT = process.env.PORT;

const app = express();
app.use(cors());

// routes
const membersRouter = require("./routes/about/members")
    app.use('/members', membersRouter)
const aboutRouter = require("./routes/about/about")
    app.use('/about', aboutRouter)
const businessRouter = require("./routes/business/business")
    app.use('/business', businessRouter)

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