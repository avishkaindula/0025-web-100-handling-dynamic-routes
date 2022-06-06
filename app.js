const path = require("path");

const express = require("express");

const defaultRoutes = require("./routes/default");
// This is how we add the default.js file into the app.js file.
// ./ will start the path "relative" to the app.js file.
// Which means the routes folder is seated in the same level as app.js
const restaurantsRoutes = require("./routes/restaurants");
// This is how we add the restaurants.js file into the app.js file.

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoutes);
// This "/" tells the browser that every incoming request should also be handled by defaultRoutes.
// This is how we add the routes inside the default.js into app.js
app.use("/", restaurantsRoutes);

app.use(function (req, res) {
  res.status(404).render("404");
});
// This is how we add a 404 error for "every" wrong incoming request that's possible.
// We do it by adding our own custom middleware like this.
// Middleware has a "use" method.
// And that method has some helper functionality that executes on "every" incoming request.
// This middleware will handles all the requests that haven't been handled up to this point,
// and send back a 404 page for all of them.
// We need to add this 404 middleware at the "bottom" of the app.js
// We pass our handling function directly to app.use()
// We should also pass a status number describing the kind of status by using .status()

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});
// This is how we add a server side error page.
// This is a middleware that only execute if an error occurred on your server.
// This function has 4 parameters.
// This 4 parameters signals to express that this is the special error handling middleware.

app.listen(3000);
