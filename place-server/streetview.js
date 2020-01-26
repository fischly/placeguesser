// const https = require('https');

// https.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyAlrSG311wiTvpZsf0ACAG9l00rsGFhxpU', (resp) => {
//   let data = '';

//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {
//       console.log('got chunk: ', chunk.length);
//     data += chunk;
//   });

//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     // console.log(JSON.parse(data).explanation);
//     console.log('end data: ', data.length, data);
//     eval(data);

//     console.log('google: ', google);

//     exports.google = google;
//   });

// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });

exports.getLatLngRNG = function getLatLngRNG() {
  return {
    lat: Math.round(Math.random() * 170 * 1000) / 1000 - 85,
    lng: Math.round(Math.random() * 356 * 1000) / 1000 - 178
  };
};
