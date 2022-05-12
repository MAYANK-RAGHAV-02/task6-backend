const USER = require("../model/user");
// const RESTAURANT = require("../model/restaurant");
const BIKE = require("../model/bike");
const bike = require("../model/bike");
// ################################### GET ALL USER #####################################
const getAllUser = async (req, res) => {
  try {
    const allUser = await USER.find();
    res.status(200).json({
      message: "fetched successfully",
      success: true,
      allUser,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error, Try later",
      success: false,
    });
    console.log(e);
  }
};

const getAllBike = async (req, res) => {
  try {
    const allBike = await BIKE.find();
    res.status(200).json({
      message: "fetched successfully",
      success: true,
      allBike,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error, Try later",
      success: false,
    });
    console.log(e);
  }
};

const addBike = async (req, res) => {
  try {
    const newBike = await new BIKE(req.body);
    await newBike.save();
    res.status(200).json({
      message: "Created successfully",
      success: true,
      newBike,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error, Try later",
      success: false,
    });
    console.log(e);
  }
};

const deleteBike = async (req, res) => {
  try {
    const id = req.params.bikeId;
    await BIKE.findByIdAndDelete(id);
    res.status(200).json({
      message: "Deleted successfully",
      success: true,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error, Try later",
      success: false,
    });
    console.log(e);
  }
};
const editBike = async (req, res) => {
  try {
    const id = req.body.id;
    const model = req.body.model;
    const location = req.body.location;
    const color = req.body.color;
    const rating = req.body.rating;
    const editBike = await bike.findByIdAndUpdate(id, {
      model: model,
      location: location,
      rating: rating,
      color: color,
    });
    await editBike.save();
    res.status(200).json({
      message: "Update successfully",
      success: true,
      editBike,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error, Try later",
      success: false,
    });
    console.log(e);
  }
};

module.exports = {
  getAllUser,
  getAllBike,
  addBike,
  deleteBike,
  editBike,
};
