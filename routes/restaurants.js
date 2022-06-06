// This is how we outsource routes to different files.

const express = require("express");
// First of all we need to require express like this in order to outsource routes to different files.

const uuid = require("uuid");
// uuid is a JS package that generates unique IDs
// uuid is an object

const resData = require("../util/restaurant-data");
// This is how we add the restaurant-data.js file to the app.js file.
// ../ will tell the browser that the path start one level up from the restaurants.js file.

const router = express.Router();
// This router objects works like app
// So we can use router. instead of app.

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;

  restaurant.restid = uuid.v4();
  // restid is a property that doesn't exist on restaurant object yet.
  // But right after we access a property that doesn't exist, JS will automatically create that property for us.
  // .v4() method will dive us unique ids.
  // Those ids are actually strings.
  // Now every restaurant we add will have a unique id.

  const storedRestaurants = resData.getStoredRestaurants();
  // This will return the getStoredRestaurants() function which is seated inside the restaurant-data.js file.

  storedRestaurants.push(restaurant);

  resData.storeRestaurants(storedRestaurants);
  // This will execute the storeRestaurants function which is seated inside the restaurant-data.js file.

  res.redirect("/confirm");
});

router.get("/restaurants", function (req, res) {
  // const filePath = path.join(__dirname, "data", "restaurants.json");
  // const fileData = fs.readFileSync(filePath);
  // const storedRestaurants = JSON.parse(fileData);
  // The above code is replaced by the following code.
  const storedRestaurants = resData.getStoredRestaurants();

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

router.get("/restaurants/:restid", function (req, res) {
  const restaurantId = req.params.restid;
  // .restid is the same on :restid
  // params is an object containing parameter values parsed from the URL path.
  // For example if you have the route /user/:name,
  // then the "name" from the URL path wil be available as req.params.name .

  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.restid === restaurantId) {
      // restaurant.restid will find out the id of a specific restaurant from the array.
      return res.render("restaurant-detail", { rid: restaurant });
      // The ": restaurant" here is the same "const restaurant" of the for loop.
      // the item inside that restaurant matches the array item of the restid.
      // We also need to add the "return" keyword like this.
    }
  }
  // This for loop will check all the items in the array until it find out the matching restid for restaurantId
  // This for loop is the code used to display the information of a restaurant in the restaurant-detail page.
  // Now we can share this unique page that displays the content of a specific restaurant with others.

  res.status(404).render("404");
  // This code line will render 404.ejs and show a 404 error message if the user enter a sub domain that doesn't exist.
});
// This is the route that is responsible for the restaurant-detail page.
// This is how we add a Dynamic route to our URL
// "restid" is a dynamic placeholder. We can also use another name instead of restid.

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
