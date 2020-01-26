let cfg = require('../config.json')
const express = require('express');
const router = express.Router();

const getDb = require("../db").getDb;
const streetview = require('../streetview');

const getCity = require('../loadcities').getCity;


router.get('/random', (req, res) => {
    // const db = getDb();
   
    res.status(200).json(streetview.getLatLngRNG());
});

router.get('/city_eu', (req, res) => {

    res.status(200).json(getCity());
});

module.exports = router;
