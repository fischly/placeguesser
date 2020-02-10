let cfg = require('./config.json');
let express = require('express');
let cors = require('cors');

const app = express();

// app.use(express.static('public')); // host public folder
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *

const db = require("./db");

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

// set routes
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const svdataRoutes = require('./routes/svData');
const addFavoritesRoutes = require('./routes/addFavorite');
const getFavoritesRoutes = require('./routes/getFavorites');

app.use("/login", loginRoutes);
app.use('/register', registerRoutes);
app.use('/getPosition', svdataRoutes);
app.use('/addFavorite', addFavoritesRoutes);
app.use('/getFavorites', getFavoritesRoutes);

// default route
app.use("/", (req, res) => {
    res.send("Welcome to gallery server 1.0");
    console.log('default route');
});

db.initDb.then(() => {
    app.listen(cfg.server.port, () => {
        console.log("Listening on port " + cfg.server.port + "...");
    });
}, () => {console.log("Failed to connect to DB!")});
