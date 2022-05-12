const BIKE = require("../model/bike");
const REVIEW = require("../model/review");
const USER = require("../model/user");
const getBike = async (req, res) => {
  try {
    const id = req.params.bikeId;
    const bike = await BIKE.findById(id);
    res.status(200).json({
      message: "fetched successfully",
      success: true,
      bike,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error, Try later",
      success: false,
    });
    console.log(e);
  }
};

const addReview = async (req, res) => {
  try {
    const id = req.params.bikeId;
    const { userId } = req.user;

    const review = req.body.review;
    const rating = req.body.rating;
    const newReview = await new REVIEW({
      review: review,
      rating: rating,
      bikeId: id,
      userId: userId,
    });
    await newReview.save();

    res.status(200).json({
      message: "fetched successfully",
      success: true,
      newReview,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error, Try later",
      success: false,
    });
    console.log(e);
  }
};
const getBikeReview = async (req, res) => {
  try {
    const id = req.params.bikeId;
    const userId = req.user.userId;
    const review = await REVIEW.find({ bikeId: id });
    let reviews = [];
    let author = false;
    for (let d of review) {
      await d.populate("userId");

      if (userId === d.userId._id.toString()) {
        author = true;
      } else {
        author = false;
      }
      reviews.push({
        _id: d._id,
        review: d.review,
        rating: d.rating,
        userName: d.userId.name,
        author: author,
      });
    }
    res.status(200).json({
      message: "fetched successfully",
      success: true,
      reviews,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error, Try later",
      success: false,
    });
    console.log(e);
  }
};

const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    await REVIEW.findByIdAndDelete(id);
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
const editReview = async (req, res) => {
  try {
    const id = req.body.id;
    const rating = req.body.rating;
    const review = req.body.review;

    const editReview = await REVIEW.findByIdAndUpdate(id, {
      rating,
      review,
    });
    await editReview.save();
    res.status(200).json({
      message: "Update successfully",
      success: true,
      editReview,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error, Try later",
      success: false,
    });
    console.log(e);
  }
};
const filterByModel = async (req, res) => {
  try {
    const model = req.body.model;
    const allbike = await BIKE.find({
      model: {
        $regex: new RegExp(model),
      },
    });

    res.status(200).json({
      message: "Update successfully",
      success: true,
      allbike,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error, Try later",
      success: false,
    });
    console.log(e);
  }
};
const filterByColor = async (req, res) => {
  try {
    const color = req.body.color;
    const allbike = await BIKE.find({
      color: {
        $regex: new RegExp(color),
      },
    });

    res.status(200).json({
      message: "Update successfully",
      success: true,
      allbike,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error, Try later",
      success: false,
    });
    console.log(e);
  }
};
const filterByLocation = async (req, res) => {
  try {
    const location = req.body.location;
    const allbike = await BIKE.find({
      location: {
        $regex: new RegExp(location),
      },
    });

    res.status(200).json({
      message: "Update successfully",
      success: true,
      allbike,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error, Try later",
      success: false,
    });
    console.log(e);
  }
};
const filterByRating = async (req, res) => {
  try {
    const rating = req.body.rating;

    let allBike;
    if (rating === null) {
      allBike = await BIKE.find();
    } else {
      allBike = await BIKE.find({ rating: rating });
    }

    res.status(200).json({
      message: "Update successfully",
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
const reservedBike = async (req, res) => {
  try {
    const id = req.user.userId;
    const user = await USER.findById(id);
    user.reservedBike.push(req.body);
    await user.save();
    res.status(200).json({
      message: "Successfully Bike Reserved",
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
const getReservedBike = async (req, res) => {
  try {
    const id = req.user.userId;
    const user = await USER.findById(id);

    res.status(200).json({
      message: "Successfully Bike Reserved",
      success: true,
      reservedBike: user.reservedBike,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error, Try later",
      success: false,
    });
    console.log(e);
  }
};
const cancelReservedBike = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.bikeId;
    const user = await USER.findById(userId);

    let arr = [];
    user.reservedBike.map((bike) =>
      bike._id === id
        ? arr.push({
            _id: bike._id,
            model: bike.model,
            rating: bike.rating,
            color: bike.color,
            location: bike.location,
            status: !bike.status,
          })
        : arr.push(bike)
    );

    const updatedUser = await USER.findByIdAndUpdate(
      userId,
      {
        reservedBike: arr,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Successfully Bike Reserved",
      success: true,
      upadatedUser: updatedUser.reservedBike,
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
  getBike,
  addReview,
  getBikeReview,
  deleteReview,
  editReview,
  filterByModel,
  filterByColor,
  filterByLocation,
  filterByRating,
  reservedBike,
  getReservedBike,
  cancelReservedBike,
};
