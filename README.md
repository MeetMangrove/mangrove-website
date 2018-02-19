# mangrove-website

The website of Mangrove: https://www.mangrove.io

## Usages

### Installation

Clone the repo, then run:
```bash
$ npm install
```

### Create and configure a .env file

```bash
# Your own secret key, used to protect cookies and login
SECRET=**************
# Slack app credentials
SLACK_CLIENT_ID=**************
SLACK_CLIENT_SECRET=**************
# comma-separated IDs of Slack teams allowed for login
SLACK_TEAM_IDS=**************
# Airtable credentials
AIRTABLE_API_KEY=**************
AIRTABLE_BASE_KEY=**************
# Redis URL (optional, defaults to localhost)
REDIS_URL=redis://localhost:6379
# Google Maps API Key (optional)
GOOGLE_MAPS_API_KEY=**************
```

To find the Airtable credentials, login on Airtable and go there: https://airtable.com/appHUSN6KmmkMAgV7/api/docs#nodejs/authentication

### Run the website

In local for development:
```bash
$ npm run start
```
By default the server will be running on port 3000: http://localhost:3000/

Lint code:
```bash
$ npm run lint
```

Fix lint errors:
```bash
$ npm run fix
```

Heroku dynos:
```bash
$ npm run web
```

### Update images

```bash
$ npm run updateImages
```

### Update locations

This script is automatically ran daily
```bash
$ npm run updateLocations
```
