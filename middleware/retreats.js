const airtable = require('./airtable.js');

function getRetreats() {
  return new Promise(function(resolve, reject) {
    const retreats = [];

    airtable.retreats
      .select({
        filterByFormula: "{Is online ?}=1"
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(retreat) {
            const lastNight = retreat.get('Last Night').split('-');
            const lastDate = new Date(lastNight[0], lastNight[1] - 1, lastNight[2]);
            const previous = lastDate.getTime() < Date.now();
            retreats.push({
              id: retreat.getId(),
              title: retreat.get('Name'),
              description: retreat.get('Description'),
              image: retreat.get('Pictures')[0].url,
              link: retreat.get('Link'),
              previous,
              isSummit: retreat.get('Is summit ?'),
              firstDate: retreat.get('First Night'),
              lastDate: retreat.get('Last Night'),
              organizersImages: retreat.get('Organizer Image'),
              organizersTwitter: retreat.get('Organizer Twitter')
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
            return;
          }

          console.log('=> Retrieved ' + retreats.length + ' retreats.');

          retreats.sort((a, b) => {
            if (a.firstDate < b.lastDate) return 1;
            if (a.firstDate > b.lastDate) return -1;
            return 0;
          });

          resolve(retreats);
        }
      );
  });
}

function getOrganizer(retreat) {
  return new Promise(function (resolve, reject) {
    const organizerId = retreat.get('Organizer')[0]
    if (typeof organizerId !== 'undefined') {
      airtable.retreat.find(organizerId, function(err, organizer) {
        if (err) { reject(err); return }
        resolve(formatOrganizer(organizer))
      })
    }
  })

  function formatOrganizer(organizer) {
    return {
      id: organizer.id,
      name: organizer.get('Name'),
      username: organizer.get('Slack Handle')
    }
  }
}

module.exports = {
  get: getRetreats
};
