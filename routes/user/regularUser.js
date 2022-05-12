const EXPRESS = require("express");
const ROUTE = EXPRESS.Router();
const AUTHCONTROLLER = require("../../controller/regular");
const isAuth = require("../../middleware/isAuth");

// ################################################ ADMIN ROUTES ###############################################################
ROUTE.get("/bike/:bikeId", isAuth, AUTHCONTROLLER.getBike);
ROUTE.get("/review/:bikeId", isAuth, AUTHCONTROLLER.getBikeReview);
ROUTE.post("/addReview/:bikeId", isAuth, AUTHCONTROLLER.addReview);
ROUTE.delete("/deleteReview/:id", isAuth, AUTHCONTROLLER.deleteReview);
ROUTE.post("/editReview", isAuth, AUTHCONTROLLER.editReview);
ROUTE.post("/reservedBike", isAuth, AUTHCONTROLLER.reservedBike);
ROUTE.get("/getReservedBike", isAuth, AUTHCONTROLLER.getReservedBike);
ROUTE.get(
  "/cancelReservation/:bikeId",
  isAuth,
  AUTHCONTROLLER.cancelReservedBike
);
ROUTE.post("/filterByName", isAuth, AUTHCONTROLLER.filterByModel);
ROUTE.post("/filterByColor", isAuth, AUTHCONTROLLER.filterByColor);
ROUTE.post("/filterByLocation", isAuth, AUTHCONTROLLER.filterByLocation);
ROUTE.post("/filterByRating", isAuth, AUTHCONTROLLER.filterByRating);

module.exports = ROUTE;
