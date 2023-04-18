const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
// basic auth, change to cors instead ?
const { apiKeyAuth } = require('@vpriem/express-api-key-auth');
var bodyParser = require('body-parser')
require('dotenv').config();
const MONGO = process.env.DATABASE_URL;
const PORT = process.env.PORT;

const app = express();
// express().use(apiKeyAuth(['my-api-key1', 'my-api-key2']));
app.use(bodyParser.json())
app.use(helmet());
app.use(express.json())
app.use(cors());
mongoose.set('strictQuery', false)

// routes
const membersRouter = require("./routes/about/member")
    app.use('/members', membersRouter)
const aboutRouter = require("./routes/about/about")
    app.use('/about', aboutRouter)
const businessRouter = require("./routes/business/business")
    app.use('/business', businessRouter)
const eventsRouter = require("./routes/events/events")
    app.use('/events', eventsRouter)
const newsRouter = require("./routes/news/news")
    app.use('/news', newsRouter)
const backgroundsRouter = require("./routes/backgrounds/backgrounds")
    app.use('/backgrounds', backgroundsRouter)
const townshipsRouter = require("./routes/townships/townships")
    app.use('/townships', townshipsRouter)
const recreationRouter = require("./routes/recreation/recreation")
    app.use('/recreation', recreationRouter)

// image route
app.use('/cdn', express.static(__dirname + '/cdn'), cors())

app.listen(PORT, () => {
    console.log('API is now listening on port ' + PORT)
});

// utility to verify that cdn routes exist on first load, and then create them if they do not exist
const directories = [
    {dir: './cdn/business'},
    {dir: './cdn/members'},
    {dir: './cdn/news'},
    {dir: './cdn/backgrounds'},
    {dir: './cdn/townships'}
]

if (!fs.existsSync("./cdn")) {
    fs.mkdirSync("./cdn")
}

{directories.map(item => {
    if (fs.existsSync(item.dir)) {
        console.log('Directory "' + item.dir + '" loaded.')
    } else {
        console.log('Directory "' + item.dir + '" not found, creating...')
        fs.mkdirSync(item.dir)
    }
})}

mongoose.connect(MONGO);
const db = mongoose.connection;
db.on('error', () => {
    console.log('DB: unknown error')
})
db.on('connected', () => {
    console.log('DB: connected')
});