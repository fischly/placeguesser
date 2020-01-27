let cities = require('./europe_cities.json');
console.log('loaded cities');
console.log('length: ', cities.cities.length);


function getCity() {
    let index = Math.floor(Math.random() * cities.cities.length);

    return cities.cities[index];
}

function getCityById(id) {
    let foundCity = null;
    for (let i = 0; i < cities.cities.length; i++) {
        if (cities.cities[i].id == id) {
            // console.log('found city:)
            foundCity = cities.cities[i];
            break;
        }
    }

    if (foundCity) {
        return foundCity;
    }
    return null;
}

module.exports = {
    getCity,
    getCityById
};
