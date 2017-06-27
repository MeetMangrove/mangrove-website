# mangrove-website

The website of Mangrove.

## Usages

### Installation

Clone the repo, then run:
```bash
$ npm install
```

### Create and configure a .env file

```bash
AIRTABLE_API_KEY=**************
AIRTABLE_BASE_KEY=**************
GOOGLE_MAPS_API_KEY=**************
```
To find the required credentials, login on airtable and go there: https://airtable.com/appHUSN6KmmkMAgV7/api/docs#nodejs/authentication

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