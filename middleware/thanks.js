var airtable = require('./airtable.js')

function getThanks () {
  return new Promise(function (resolve, reject) {
    var result = []

    airtable.thanks.select({
      filterByFormula: "IF({Date} > DATETIME_FORMAT(TODAY(), 'x')  - 10080000)"
    }).eachPage(function page (records, fetchNextPage) {
      result = records
      // console.log(records)
      fetchNextPage()
    }, function done (err) {
      if (err) {
        reject(err)
        return
      }

      resolve({
        thanks: result
      })
    })
  })
}

module.exports = {
  get: getThanks
}
