const EXPRESS = require("express");
const ROUTE = EXPRESS.Router();
const AUTHCONTROLLER = require("../../controller/Admin");
const isAuth = require("../../middleware/isAuth");

// ################################################ ADMIN ROUTES ###############################################################
ROUTE.get("/user", isAuth, AUTHCONTROLLER.getAllUser);
ROUTE.get("/bikes", isAuth, AUTHCONTROLLER.getAllBike);
ROUTE.post("/addBike", isAuth, AUTHCONTROLLER.addBike);
ROUTE.delete("/delete/:bikeId", isAuth, AUTHCONTROLLER.deleteBike);
ROUTE.post("/editBike", isAuth, AUTHCONTROLLER.editBike);

module.exports = ROUTE;
