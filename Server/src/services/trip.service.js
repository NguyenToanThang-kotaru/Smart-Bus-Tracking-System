const tripModel = require('../models/trip.model');
exports.getAllTrip = (callback) => {
    tripModel.getAllTrip(callback)
}

exports.updateStatus = (MaLT, TrangThai, callback) => {
    tripModel.updateStatus(MaLT,TrangThai,callback)
}