# gpu-price-tracker-mern-table

# 🚀 Javascript full-stack 🚀

## MERN Stack

### React / Express / MongoDB / Redux

https://github.com/coding-to-music/gpu-price-tracker-mern-table

https://gpu-price-tracker-mern-table.herokuapp.com

by MrsKamran https://github.com/MrsKamran

https://github.com/MrsKamran/habit-tracker

# GPUPriceTracker

GPUPriceTracker is a React web application that periodically scrapes online retailers for GPU prices.
The website displays information about each scraped GPU and allows you to save GPUs you want to keep
track of in a separate page with the plus icon. This web application uses React, React Table, and Material-UI for its
UI and Node.js, Express.js, and MongoDB for the server and database.

Note that the deployed website may not have scheduled web scraping because job scheduling isn't currently set up on Heroku.
If you run this app on your local machine, GPU data will be scraped every 30 minutes.

All prices listed are in CAD.

## Live Demo

Here is the deployed app on Heroku: https://gpu-price-tracker.herokuapp.com

## Site

### Home

![Screenshot 1](https://i.imgur.com/K8ny9F4.png)

### Saved

![Screenshot 2](https://i.imgur.com/Gy9k1MH.png)

## Development

If you want to develop and run this app on your local machine, you need to do the following after cloning the repo:

### Install Dependencies

You have to install dependencies for both backend and frontend

```
npm i
cd client
npm i
```

This should install the following modules

```
For backend:
axios
cheerio
cors
dotenv
express
mongoose
node-schedule
path
puppeteer

For frontend:
@material-ui/core
@material-ui/icons
@testing-library/jest-dom
@testing-library/react
@testing-library/user-event
axios
react
react-dom
react-router-dom
react-scripts
react-table
web-vitals
```

### Env Variables

You have to create your own `.env` file in the root directory and add the following:

```
PORT = 5000
ATLAS_URI = your MongoDB URI
```

### Run

In order to start running this on your local machine, run the following:

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Todo

- Add Heroku Scheduler to deployed website on Heroku
- Add Canada Computers and Amazon to scrapers
- Fix Best Buy image scraping on lazy load
- Add price history and model numbers to GPUs

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/gpu-price-tracker-mern-table.git
git push -u origin main
```

## Heroku

```java
heroku create gpu-price-tracker-mern-table
```

## Heroku MongoDB Environment Variables

```java
heroku config:set


heroku config:set MONGODB_URI="mongodb+srv://<userid>:<password>@cluster0.zadqe.mongodb.net/gpu-price-tracker-mern-table?retryWrites=true&w=majority"
heroku config:set PASSWORD="something-secret"

heroku config:set PUBLIC_URL="https://gpu-price-tracker-mern-table.herokuapp.com"
```

## Push to Heroku

```java
git push heroku

# or

npm run deploy
```

### Heroku Buildpack

See this repo for more info about setting up a node/react app on heroku:

https://github.com/mars/heroku-cra-node

```java
heroku buildpacks

heroku buildpacks --help

heroku buildpacks:clear

```

```java
heroku buildpacks
```

Output:

```java
=== gpu-price-tracker-mern-table Buildpack URL
heroku/nodejs
```

### Notice we are doing a SET and then and ADD

```java
heroku buildpacks:set heroku/nodejs

heroku buildpacks:add mars/create-react-app
```

Output:

```java
Buildpack added. Next release on gpu-price-tracker-mern-table will use:
  1. heroku/nodejs
  2. mars/create-react-app
Run git push heroku main to create a new release using these buildpacks.
```

### Lets try reversing the order

```java
heroku buildpacks:set mars/create-react-app

heroku buildpacks:add heroku/nodejs
```

```java
heroku buildpacks
```

Output:

```java
=== gpu-price-tracker-mern-table Buildpack URL
heroku/nodejs
```

### Push to Heroku

```
git push heroku
```

## Error:

```java
2022-04-09T03:12:56.076028+00:00 app[web.1]: ls: cannot access '/app/build/static/js/*.js': No such file or directory
2022-04-09T03:12:56.076252+00:00 app[web.1]: Error injecting runtime env: bundle not found '/app/build/static/js/*.js'. See: https://github.com/mars/create-react-app-buildpack/blob/master/README.md#user-content-custom-bundle-location
2022-04-09T03:12:56.253505+00:00 app[web.1]: Starting log redirection...
2022-04-09T03:12:56.253698+00:00 app[web.1]: Starting nginx...
```

Attempted this:

```java
heroku config:set JS_RUNTIME_TARGET_BUNDLE=./client/build/static/js/*.js

heroku config:set JS_RUNTIME_TARGET_BUNDLE=/build/static/js/*.js

# and to remote it:

heroku config:unset JS_RUNTIME_TARGET_BUNDLE

```

## update npm packages

```java
npm install -g npm-check-updates
```

Output:

```java
removed 3 packages, changed 263 packages, and audited 264 packages in 10s

29 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

```java
ncu -u
```

Output:

```java
Upgrading /mnt/volume_nyc1_01/gpu-price-tracker-mern-table/package.json
[====================] 15/15 100%

 axios                ^0.21.0  →  ^0.26.1
 bcrypt                ^5.0.0  →   ^5.0.1
 body-parser          ^1.19.0  →  ^1.20.0
 cookie-parser         ^1.4.5  →   ^1.4.6
 dotenv                ^8.2.0  →  ^16.0.0
 express              ^4.17.1  →  ^4.17.3
 express-fileupload    ^1.2.0  →   ^1.3.1
 js-cookie             ^2.2.1  →   ^3.0.1
 mongoose            ^5.10.13  →  ^6.2.10
 nodemon               ^2.0.6  →  ^2.0.15
 reactjs-popup         ^2.0.4  →   ^2.0.5
 validator           ^13.1.17  →  ^13.7.0

Run npm install to install new versions.
```

```java
npm install
```

Output:

```java
added 58 packages, removed 42 packages, changed 89 packages, and audited 299 packages in 7s

32 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## Client directory

```java
cd client

ncu -u
```

```java
Upgrading /mnt/volume_nyc1_01/gpu-price-tracker-mern-table/client/package.json
[====================] 18/18 100%

 @testing-library/jest-dom     ^5.11.4  →  ^5.16.4
 @testing-library/react        ^11.1.0  →  ^13.0.0
 @testing-library/user-event  ^12.1.10  →  ^14.0.4
 axios                         ^0.21.0  →  ^0.26.1
 dotenv                         ^8.2.0  →  ^16.0.0
 js-cookie                      ^2.2.1  →   ^3.0.1
 node-sass                     ^4.14.1  →   ^7.0.1
 react                         ^17.0.1  →  ^18.0.0
 react-dom                     ^17.0.1  →  ^18.0.0
 react-redux                    ^7.2.2  →   ^7.2.8
 react-router-dom               ^5.2.0  →   ^6.3.0
 react-scripts                   4.0.0  →    5.0.0
 reactjs-popup                  ^2.0.4  →   ^2.0.5
 redux                          ^4.0.5  →   ^4.1.2
 redux-thunk                    ^2.3.0  →   ^2.4.1
 web-vitals                     ^0.2.4  →   ^2.1.4

Run npm install to install new versions.
```
