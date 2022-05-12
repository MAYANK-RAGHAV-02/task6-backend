// ###################################### DEPENDENCIES REQUIREMENT #########
const DOTENV = require("dotenv");
DOTENV.config();
const EXPRESS = require("express");
const APP = EXPRESS();
const MONGOOSE = require("mongoose");
const CORS = require("cors");
const ADMIN = require("./routes/admin/admin");
const REGULAR = require("./routes/user/regularUser");
const AUTH = require("./routes/auth/auth");
const PORT = process.env.PORT;

// ######################################### DATABASE CONNECTION ############
MONGOOSE.connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log("error from the mongoose");
    console.log(e.message);
  });

// ########################################## MIDDLEWARE ###################
APP.use(
  CORS({
    origin: "*",
    withCredentials: false,
    allowedHeaders: [
      "Content-Type",
      "Path",
      "Authorization",
      "X-Requested-With",
      "X-Content-Type-Options",
      "X-Frame-Options",
      "Accept",
      "Origin",
    ],
  })
);

APP.use(EXPRESS.json({ limit: "4000kb", extended: true }));
APP.use(
  EXPRESS.urlencoded({
    extended: true,
  })
);

// ########################################## REQUIRED FILES ################
APP.get("/", (req, res) => {
  res
    .status(200)
    .send(
      '<div style="border: 5px solid; padding: 10px; text-align:center;"><h1>Restarent Server</h1></div>'
    );
});
APP.use("/admin", ADMIN);
APP.use("/regular", REGULAR);
APP.use("/auth", AUTH);

// ############################################ LISTEN PORT ##################
APP.listen(PORT, () => {
  console.log(`Connected to ${PORT}`);
});
