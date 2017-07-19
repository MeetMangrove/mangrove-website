import Promise from 'bluebird'
import asyncForEach from 'async-foreach'
import Gmaps from '@google/maps'

require('dotenv').config()

const {forEach} = asyncForEach

const gmaps = Gmaps.createClient({
  key: process.env.GOOGLE_MAPS_API_KEY
})

const callMapsAPI = (address) => {
  return new Promise(function(resolve, reject) {
    gmaps.geocode({address}, function(err, response) {
      if (err) return reject(err)
      resolve(response.json.results)
    })
  })
}

export const formatAddress = (locations) => {
  return new Promise(function(resolve, reject) {
    let coordinates = [];
    forEach (locations, async function(location) {
      const done = this.async()
      // Check if a user have filled an address
      if(location) {
        const results = await callMapsAPI(location);
        // Remove invalid adresses
        if(results.length === 1) {
          coordinates.push(results[0].geometry.location)
        }
      }
  	  done()
    }, function() {
      resolve(coordinates)
    });

  })
}