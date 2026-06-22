const express = require("express");
const router = express.Router();

const stationController =
require("../controllers/stationController");

router.get(
    "/",
    stationController.getStations
);

router.post(
    "/update-location",
    stationController.updateLocation
);

module.exports = router;