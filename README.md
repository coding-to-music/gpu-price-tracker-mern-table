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
````

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

