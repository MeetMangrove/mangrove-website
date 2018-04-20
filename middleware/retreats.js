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
            const lastDate = new Date(lastNight[0], lastNight[1], lastNight[2]);
            const previous = lastDate.getTime() < Date.now();
            retreats.push({
              title: retreat.get('Name'),
              description: retreat.get('Description'),
              image: retreat.get('Pictures')[0].url,
              slug: 'http://retreat.mangrove.io/' + retreat.get('Slug'),
              previous,
              firstDate: retreat.get('First Night'),
              lastDate: retreat.get('Last Night')
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
            return;
          }

          console.log(retreats);

          console.log('=> Retrieved ' + retreats.length + ' retreats.');

          retreats.sort((a, b) => {
            if (a.firstDate < b.lastDate) return 1;
            if (a.firstDate > b.lastDate) return -1;
            return 0;
          });

          resolve({ retreats });
        }
      );
  });
}

module.exports = {
  get: getRetreats
};
