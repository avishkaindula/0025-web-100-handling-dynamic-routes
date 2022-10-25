// We can split the code in restaurants.js into different files like this.

const fs = require("fs");
const path = require("path");
// First we have to require the files we defined in this file like this.

const filePath = path.join(__dirname, "..", "data", "restaurants.json");
// filePath is accessible from all the functions in this file as it's seated outside the functions.
// ".." will tell that we want to go to a higher directory from the directory you are currently in

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants;
  // We need to return storedRestaurants like this
  // return will make storedRestaurants accessible outside the function as well.
}
// We can create a function to parse JSON files and call it whenever we want in app.js like this.

function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants,
};
// Before we use this restaurant-data.js file in other files, we need to expose the code inside it like this.
// Name on the right side is the name of the function
// Name on the left side is the name we use to expose that function to other files
// Typically we use the same name for both.
