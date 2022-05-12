const EXPRESS = require("express");
const ROUTE = EXPRESS.Router();
const AUTHCONTROLLER = require("../../controller/auth");
const isAuth = require("../../middleware/isAuth");

// ################################################ AUTHENTICATION ROUTES ###############################################################
ROUTE.post("/signUp", AUTHCONTROLLER.signUp); // ####################### SIGN UP ROUTE ########################
ROUTE.post("/login", AUTHCONTROLLER.login); // ####################### LOGIN ROUTES  ########################

module.exports = ROUTE;
