let cities = require('./europe_cities.json');
console.log('loaded cities');
console.log('length: ', cities.cities.length);


function getCity() {
    let index = Math.floor(Math.random() * cities.cities.length);

    return cities.cities[index];
}

module.exports = {
    getCity,
};
