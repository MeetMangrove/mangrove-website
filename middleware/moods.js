var airtable = require('./airtable.js')

function getMoods () {
  return new Promise(function (resolve, reject) {
    var result = []

    airtable.moods.select({
      filterByFormula: "IS_SAME({Affichage Date},TODAY(),'day')"
    }).eachPage(function page (records, fetchNextPage) {
      var count = records.length
      var sum = 0
      records.forEach(function (record) {
        sum += record.fields.Level
      })
      var resultFull = sum / count
      result = Math.round(resultFull * 100) / 100
      fetchNextPage()
    }, function done (err) {
      if (err) {
        reject(err)
        return
      }

      resolve({
        moods: result
      })
    })
  })
}

module.exports = {
  get: getMoods
}
