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
    forEach (addresses, async function(addresse) {
  	  var done = this.async()
      var result = await callMapsAPI(addresse)
      console.log(result)
  	  done()
    }, function() {
      console.log("done");
      resolve()
    });

  })
}

