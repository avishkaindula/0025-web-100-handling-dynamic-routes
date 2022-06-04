const fs = require("fs");
const path = require("path");

const express = require("express");
const uuid = require("uuid");
// uuid is a JS package that generates unique IDs
// uuid is an object

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;

  restaurant.restid = uuid.v4();
  // restid is a property that doesn't exist on restaurant object yet.
  // But right after we access a property that doesn't exist, JS will automatically create that property for us.
  // .v4() method will dive us unique ids.
  // Those ids are actually strings.
  // Now every restaurant we add will have a unique id.

  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect("/confirm");
});

app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/restaurants/:restid", function (req, res) {
  const restaurantId = req.params.restid;
  // .restid is the same on :restid
  // params is an object containing parameter values parsed from the URL path.
  // For example if you have the route /user/:name,
  // then the "name" from the URL path wil be available as req.params.name .

  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

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

  res.render("404");
  // This code line will render 404.ejs and show a 404 error message if the user enter a sub domain that doesn't exist.
});
// This is the route that is responsible for the restaurant-detail page.
// This is how we add a Dynamic route to our URL
// "restid" is a dynamic placeholder. We can also use another name instead of restid.

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.use(function (req, res) {
  res.render("404");
});
// This is how we add a 404 error for "every" wrong incoming request that's possible.
// We do it by adding our own custom middleware like this.
// Middleware has a "use" method.
// And that method has some helper functionality that executes on "every" incoming request.
// This middleware will handles all the requests that haven't been handled up to this point,
// and send back a 404 page for all of them.
// We need to add this 404 middleware at the "bottom" of the app.js
// We pass our handling function directly to app.use()

app.listen(3000);
