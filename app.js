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
  res.render("restaurant-detail", { rid: restaurantId });
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

app.listen(3000);
