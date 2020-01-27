let cfg = require('../config.json')
const express = require('express');
const router = express.Router();

const getDb = require("../db").getDb;
const streetview = require('../streetview');

const { getCity, getCityById } = require('../loadcities');


router.get('/random', (req, res) => {
    // const db = getDb();
   
    res.status(200).json(streetview.getLatLngRNG());
});

router.get('/city_eu', (req, res) => {

    res.status(200).json(getCity());
});

router.get('/city_eu/:id', (req, res) => {
    let id = req.params.id;
    let foundCity = getCityById(id);

    if (foundCity) {
        res.status(200).json(foundCity);
    } else {
        res.status(404).json({ error: `city with id ${id} not found`});
    }

});


module.exports = router;
