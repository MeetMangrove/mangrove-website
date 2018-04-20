const airtable = require('./airtable.js');

function getParticipants() {
  return new Promise(function (resolve, reject) {
    const participants = []

    airtable.participants.select({}).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        participants.push({ ...record.fields })
      })

      fetchNextPage()
    }, function done(err) {
      if (err) { reject(err); return }
      resolve(participants)
    })
  })
}

module.exports = {
  get: getParticipants,
}
