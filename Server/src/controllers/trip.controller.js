const tripService = require("../services/trip.service");
require("dotenv").config();

exports.getAllTrip = async (req, res) => {
    tripService.getAllTrip((err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (!result || result.length === 0) {
            return res.json([]);
        }

        const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Ho_Chi_Minh" });

        const grouped = result.reduce((acc, trip) => {
            const key = trip.SoXeBuyt;
            const tripDate = new Date(trip.NgayHanhTrinh)
                .toLocaleDateString("en-CA", { timeZone: "Asia/Ho_Chi_Minh" });

            if (tripDate !== today) return acc;

            // Nếu chưa có xe này thì tạo mới
            if (!acc[key]) {
                acc[key] = {
                    SoXeBuyt: trip.SoXeBuyt,
                    MaTX: trip.MaTX,
                    MaLT: trip.MaLT,
                    NgayHanhTrinh: trip.NgayHanhTrinh,
                    CaHanhTrinh: trip.CaHanhTrinh,
                    TrangThai: trip.TrangThai,
                    TramList: [],
                };
            }

            // Push thêm thông tin chi tiết của từng trạm
            acc[key].TramList.push({
                MaTram: trip.MaTram,
                TenTram: trip.TenTram,
                ViDo: trip.x,       // hoặc trip.x
                KinhDo: trip.y,   // hoặc trip.y
            });

            return acc;
        }, {});

        res.json(Object.values(grouped));
    });
};

exports.updateStatus = (req, res) => {
    const { MaLT, TrangThai } = req.body;

    if (!MaLT || !TrangThai) {
        return res.status(400).json({ message: "Thiếu dữ liệu MaLT hoặc TrangThai" });
    }

    tripService.updateStatus(MaLT, TrangThai, (err, result) => {
        if (err) {
            console.error(" Lỗi updateStatus:", err);
            return res.status(500).json({ message: "Lỗi cập nhật trạng thái" });
        }

        return res.status(200).json({
            message: "Cập nhật trạng thái thành công",
            result,
        });
    });
};
