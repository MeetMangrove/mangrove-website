import Promise from 'bluebird'
import asyncForEach from 'async-foreach'
import Gmaps from '@google/maps'

require('dotenv').config()

const {forEach} = asyncForEach

const gmaps = Gmaps.createClient({
  key: process.env.GOOGLE_MAPS_API_KEY
})

const callMapsAPI = (address) => {
  return new Promise(function (resolve, reject) {
    gmaps.geocode({address}, function(err, response) {
      if (err) return reject(err)
      resolve(response.json.results)
    })
  })
}

export const formatAddress = (addresses) => {
  return new Promise(function (resolve, reject) {
    let adresssCoordinates = [];
    forEach ([addresses[3]], async function(addresse) {
      const done = this.async()
      // Check if a user have filled an address
      if(addresse) {
        const results = await callMapsAPI(addresse);
        // Remove invalid adresses (length = 0) and multiple matches (length > 1)
        if(results.length === 1) {
          adresssCoordinates.push(results[0].geometry.location)
        }
      }
  	  done()
    }, function() {
      resolve(adresssCoordinates)
    });

  })
}

