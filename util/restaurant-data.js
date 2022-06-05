// We can split the code in app.js into different files like this.

const filePath = path.join(__dirname, "data", "restaurants.json");
// filePath is accessible from all the functions in this file as it's seated outside the functions.

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
