# FoodPrint Website

FoodPrint website built using Node.js and Bootstrap.

## IDE Setup

IDE of choice is VS Code

## Installation (Development Environment)

In order to run FoodPrint Website, an environment with the following is required:

- Node.js
- Bootstrap
- MySQL

1. Install node dependencies.

```
$npm install
```

2. Create a blank MySQL database

3. Create a database configuration file in the root folder - `dbconfig.json` and populate with
   updated json config as below

```json
{
  "development": {
    "username": <USERNAME>,
    "password": <PASSWORD>,
    "database": <DATABASENAME>,
    "host": <HOSTNAME>,
    "dialect": "mysql",
    "logging": true
  },
  "test": {
    "username": <USERNAME>,
    "password": <PASSWORD>,
    "database": <DATABASENAME>,
    "host": <HOSTNAME>,
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "username": <USERNAME>,
    "password": <PASSWORD>,
    "database": <DATABASENAME>,
    "host": <HOSTNAME>,
    "dialect": "mysql",
    "logging": false
  }
}
```

4. Create a .env file in the root directory of your project. Add environment-specific variables on
   new lines in the form of NAME=VALUE. For example

```
NODE_ENV=staging
PORT=3000
APP_NAME=REPLACE_ME
SESSION_SECRET=REPLACE_ME
EMAIL_ADDRESS=GMAIL_EMAIL_ADDRESS
EMAIL_PASSWORD=GMAIL_EMAIL_PASSWORD
EMAIL_OVERRIDE=OVERRIDE_EMAIL_ADDRESS
```

5. Start the web server (Express) and navigate to http://localhost:3000/ in your browser.

```
$npm run dev
```

## Production Deployment

1. To deploy to a production server e.g. heroku, first bundle and uglify then deploy

```
$npm run build
$npm run start
```

## Other

- Generating Sequelize Models from an existing database using Sequelize Auto. For convenience
  Sequelize Auto provides a programmatic api that can be used in the generation of models in
  addition to their [cli](https://github.com/sequelize/sequelize-auto). You can use the convenience
  script `src/js/sequelise_auto_export.js` to generate required models by supplying the table names
  in the `tables` section of the `options` object. The script establishes a connection to the
  database using the config data specified in step `3`. Execute the command below within `src/js` to
  generate the models for the specified tables:

```bash
node sequelise_auto_export.js
```

The generated models can be found in `./models`

- Generate test UUID's from command line (i.e. server side).

## Deploy to Heroku

Summary

```
Create app on Heroku

login to Heroku via command line i.e. heroku login

add heroku remote to your local repo i.e. heroku git:remote -a app name

Link to Git Repo

Update env variables

Create database addon Postgres (natively supported by Heroku) or ClearDB which is MySQL -
https://devcenter.heroku.com/articles/cleardb


$ heroku addons:create cleardb:ignite
$ heroku config | findstr CLEARDB_DATABASE_URL
$ heroku config | set DATABASE_URL= # MySQL database url retrieved from above line
```

Deploy repo to Heroku

```
$ git push heroku main
```

Install Heroku releases retry plugin (if you deploy to heroku and it fails, you no longer have to
commit a dummy txt file in order to bump up the latest commit hash so that your next push up to
heroku will trigger a deploy.)

```
$ heroku plugins:install heroku-releases-retry
```

Then to retry failed deploy

```
$ heroku releases:retry
```

Login to Heroku bash

```
$ heroku run bash
```

If everything went well, you’ve successfully deployed your Node.js app to Heroku. To open your app,
run:

```
$ heroku open
```

If you ever need to restart/stop the Heroku app

```
$ heroku ps:restart web -a nameofapp
$ heroku ps:stop web -a nameofapp
```

If you need to run sequelize migrations in Heroku (although this is included in the build step in
`package.json`)

```
$ heroku run npx sequelize-cli db:migrate --url 'mysql://root:password@mysql_host.com/database_name' --app nameofapp
```

Tail Heroku logs

```
$ heroku logs --tail
```

Migrate data from MySQL to local Postgres using `pgloader`

```
$ pgloader mysql://username:password@localhost/mysqldbname postgresql:///pgdbname
```

Push local Postgres to Heroku (v1)

```
$ heroku pg:psql heroku-db-name --app nameofapp
```

Push local Postgres to Heroku (v2)

```
$ PGUSER=postgres PGPASSWORD=password123  heroku pg:push postgres://localhost/example <heroku-db-name>
```

Reset Heroku Postgres database (i.e. truncate)

```
$ heroku pg:reset
```

Backup Heroku Postgres database

```
$ heroku pg:backups:capture
$ heroku pg:backups:download
```

## Supported Browsers

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                      | Supported                                                                                                                                                                                                         | Supported                                                                                                                                                                                                     | Supported                                                                                                                                                                                                     | Supported                                                                                                                                                                                                                     | Supported                                                                                                                                                                                                                           | Supported                                                                                                                                                                                                 |
