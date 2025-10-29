const tripModel = require('../models/trip.model');
exports.getAllTrip = (callback) => {
    tripModel.getAllTrip(callback)
}