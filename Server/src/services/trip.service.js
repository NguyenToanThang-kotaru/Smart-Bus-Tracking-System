const tripModel = require('../models/trip.model');
exports.getAllTrip = (callback) => {
    tripModel.getAllTrip(callback)
}
exports.getLichTrinhByMa = (MaLT,callback) => {
    tripModel.getLichTrinhByMa(MaLT,callback)
}

exports.updateStatus = (MaLT, TrangThai, callback) => {
    tripModel.updateStatus(MaLT,TrangThai,callback)
}

exports.getLichTrinhByPhuHuynh = (TenDangNhap, callback) =>{
    tripModel.getLichTrinhByPhuHuynh(TenDangNhap, callback)
}