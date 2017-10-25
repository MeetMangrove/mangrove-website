var airtable = require('../middleware/airtable.js')

// if this script is executed via the CLI, generate the pairing
if (require.main === module) {
  console.log('Start to update images...')
  airtable.members.select({
    // filterByFormula: "{Status} = 'Cofounder'",
  }).eachPage(function page (records, fetchNextPage) {
    records.forEach(function (record) {
      var tw = record.get('Twitter') && record.get('Twitter').length ? record.get('Twitter') : null
      var img = tw ? 'https://twitter.com/' + tw + '/profile_image?size=original' : null
      airtable.members.update(record.id, {
        'Profile Picture': [{
          url: img,
          filename: tw + '.jpg'
        }]
      }, function (err, record) {
        if (err) {
          console.error(err)
          return
        }
        console.log(record.get('Name'))
      })
    })

    fetchNextPage()
  }, function done (err) {
    if (err) {
      console.log(err)
    }
    console.log('All images have been updated!')
  })
}
