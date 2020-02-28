## Using the app

Please fill all the boxes on top of the screen with correct information(see correct format on dates) and hit send.

## Heroku

This project is deployed to Heroku --> [Link to Heroku application.](https://masterpiece1.herokuapp.com/)

If for some reason the Heroku link doesn't work, you can try to reload the page a couple of times (Heroku can be slow sometimes) or you can alternatively install this locally by following the install instructions below.

## Installing locally

1. Clone this repository to your local machine
2. Make sure you have node and npm installed on your system.
3. In the project directory, you can run:

### `npm install`

Installs all correct node_modules

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

## Known issues

- The data table pagination doesn't change "next page numbers" when navigating through page numbers. Only works with "next" and "prev" buttons. 
- App sometimes fails to load data from API when trying to change dates without reloading the page.
- "Graph" or "Heatmap" can sometimes look incomplete or not show at all if not given enough data.
