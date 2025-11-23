-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 08, 2025 lúc 09:29 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `smartbustrackingsystem`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diemdanh`
--

CREATE TABLE `diemdanh` (
  `MaLT` varchar(10) NOT NULL,
  `MaHS` varchar(10) NOT NULL,
  `TrangThai` varchar(1) NOT NULL DEFAULT '0',
  `TrangThaiXoa` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hocsinh`
--

CREATE TABLE `hocsinh` (
  `MaHS` varchar(10) NOT NULL,
  `MaPH` varchar(10) NOT NULL,
  `MaTram` varchar(10) NOT NULL,
  `TenHS` varchar(100) NOT NULL,
  `Lop` varchar(10) NOT NULL,
  `TrangThaiXoa` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lichtrinh`
--

CREATE TABLE `lichtrinh` (
  `MaLT` varchar(10) NOT NULL,
  `MaTX` varchar(10) NOT NULL,
  `NgayHanhTrinh` varchar(20) NOT NULL,
  `CaHanhTrinh` varchar(100) NOT NULL,
  `TrangThai` varchar(1) NOT NULL DEFAULT '0',
  `TrangThaiXoa` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoidung`
--

CREATE TABLE `nguoidung` (
  `MaND` varchar(10) NOT NULL,
  `MaVT` varchar(10) NOT NULL,
  `TenND` varchar(100) NOT NULL,
  `TenDangNhap` varchar(100) NOT NULL,
  `MatKhau` varchar(255) NOT NULL,
  `TrangThaiXoa` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phancong`
--

CREATE TABLE `phancong` (
  `MaPC` varchar(10) NOT NULL,
  `MaTX` varchar(10) NOT NULL,
  `SoXeBuyt` varchar(10) NOT NULL,
  `MaTD` varchar(10) NOT NULL,
  `TrangThaiXoa` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phuhuynh`
--

CREATE TABLE `phuhuynh` (
  `TenDangNhap` varchar(10) NOT NULL,
  `SdtPH` varchar(10) NOT NULL,
  `TenPH` varchar(100) NOT NULL,
  `MatKhau` varchar(255) NOT NULL,
  `TrangThaiXoa` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taixe`
--

CREATE TABLE `taixe` (
  `MaTX` varchar(10) NOT NULL,
  `SoCccd` varchar(12) NOT NULL,
  `SdtTX` varchar(10) NOT NULL,
  `BacBangLai` varchar(10) NOT NULL,
  `TrangThaiXoa` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tram`
--

CREATE TABLE `tram` (
  `MaTram` varchar(10) NOT NULL,
  `MaTuyenDuong` varchar(10) NOT NULL,
  `TenTram` varchar(100) NOT NULL,
  `x` varchar(100) NOT NULL,
  `y` varchar(100) NOT NULL,
  `TrangThaiXoa` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tramlichtrinh`
--

CREATE TABLE `tramlichtrinh` (
  `MaLT` varchar(10) NOT NULL,
  `MaTram` varchar(10) NOT NULL,
  `TrangThai` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tuyenduong`
--

CREATE TABLE `tuyenduong` (
  `MaTD` varchar(10) NOT NULL,
  `TenTD` varchar(100) NOT NULL,
  `TrangThaiXoa` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vaitro`
--

CREATE TABLE `vaitro` (
  `MaVT` varchar(10) NOT NULL,
  `TenVT` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `xebuyt`
--

CREATE TABLE `xebuyt` (
  `SoXeBuyt` varchar(10) NOT NULL,
  `BienSoXe` varchar(10) NOT NULL,
  `SucChua` varchar(5) NOT NULL,
  `TrangThaiXe` varchar(100) NOT NULL,
  `TrangThaiXoa` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `hocsinh`
--
ALTER TABLE `hocsinh`
  ADD PRIMARY KEY (`MaHS`);

--
-- Chỉ mục cho bảng `lichtrinh`
--
ALTER TABLE `lichtrinh`
  ADD PRIMARY KEY (`MaLT`);

--
-- Chỉ mục cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`MaND`);

--
-- Chỉ mục cho bảng `phancong`
--
ALTER TABLE `phancong`
  ADD PRIMARY KEY (`MaPC`);

--
-- Chỉ mục cho bảng `phuhuynh`
--
ALTER TABLE `phuhuynh`
  ADD PRIMARY KEY (`TenDangNhap`);

--
-- Chỉ mục cho bảng `taixe`
--
ALTER TABLE `taixe`
  ADD PRIMARY KEY (`MaTX`);

--
-- Chỉ mục cho bảng `tram`
--
ALTER TABLE `tram`
  ADD PRIMARY KEY (`MaTram`);

--
-- Chỉ mục cho bảng `tuyenduong`
--
ALTER TABLE `tuyenduong`
  ADD PRIMARY KEY (`MaTD`);

--
-- Chỉ mục cho bảng `vaitro`
--
ALTER TABLE `vaitro`
  ADD PRIMARY KEY (`MaVT`);

--
-- Chỉ mục cho bảng `xebuyt`
--
ALTER TABLE `xebuyt`
  ADD PRIMARY KEY (`SoXeBuyt`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- ==========================
-- DỮ LIỆU MẪU HỆ THỐNG SMART BUS TRACKING (MÃ 8 KÝ TỰ)
-- ==========================

-- Bảng vai trò
INSERT INTO `vaitro` (`MaVT`, `TenVT`) VALUES
('VT000001', 'Quản trị viên'),
('VT000002', 'Quản lý xe buýt'),
('VT000003', 'Tài xế'),
('VT000004', 'Phụ huynh');

-- Bảng người dùng
INSERT INTO `nguoidung` (`MaND`, `MaVT`, `TenND`, `TenDangNhap`, `MatKhau`, `TrangThaiXoa`) VALUES
('ND000001', 'VT000001', 'Administrator', 'admin', '123456', '0'),
('ND000002', 'VT000002', 'Lê Quốc Vinh', 'quanlyxebuyt', '123456', '0'),
('ND000003', 'VT000003', 'Trần Văn Tài', 'taixetv', '123456', '0'),
('ND000004', 'VT000003', 'Trần Văn Thái', 'taixetv', '123456', '0');

-- Bảng phụ huynh
INSERT INTO `phuhuynh` (`TenDangNhap`, `SdtPH`, `TenPH`, `MatKhau`, `TrangThaiXoa`) VALUES
('PH000001', '0905000001', 'Nguyễn Thị Lan', '123456', '0'),
('PH000002', '0905000002', 'Trần Văn Hùng', '123456', '0'),
('PH000003', '0905000003', 'Lê Thị Mai', '123456', '0'),
('PH000004', '0905000004', 'Phạm Quốc Anh', '123456', '0'),
('PH000005', '0905000005', 'Đặng Ngọc Dung', '123456', '0'),
('PH000006', '0905000006', 'Võ Minh Tâm', '123456', '0'),
('PH000007', '0905000007', 'Nguyễn Hồng Nhung', '123456', '0'),
('PH000008', '0905000008', 'Bùi Văn Toàn', '123456', '0'),
('PH000009', '0905000009', 'Hoàng Thị Hạnh', '123456', '0'),
('PH000010', '0905000010', 'Phan Văn Quý', '123456', '0'),
('PH000011', '0905000011', 'Nguyễn Mỹ Linh', '123456', '0'),
('PH000012', '0905000012', 'Lê Anh Đức', '123456', '0'),
('PH000013', '0905000013', 'Trần Minh Thư', '123456', '0'),
('PH000014', '0905000014', 'Phạm Quốc Việt', '123456', '0'),
('PH000015', '0905000015', 'Võ Thị Hoa', '123456', '0'),
('PH000016', '0905000016', 'Bùi Văn Long', '123456', '0'),
('PH000017', '0905000017', 'Nguyễn Thị Thanh', '123456', '0'),
('PH000018', '0905000018', 'Phan Hữu Nghĩa', '123456', '0'),
('PH000019', '0905000019', 'Lê Hồng Vân', '123456', '0'),
('PH000020', '0905000020', 'Đặng Minh Tân', '123456', '0');
-- Bảng tài xế
INSERT INTO `taixe` (`MaTX`, `SoCccd`, `SdtTX`, `BacBangLai`, `TrangThaiXoa`) VALUES
('ND000003', '012345678911', '0909123123', 'B2', '0'),
('ND000004', '012345678811', '0988123456', 'C', '0');

-- Bảng tuyến đường
INSERT INTO `tuyenduong` (`MaTD`, `TenTD`, `TrangThaiXoa`) VALUES
('TD000001', 'Tuyến số 1: Trường THCS Minh Đức KDC Nam Long', '0'),
('TD000002', 'Tuyến số 2: Trường THCS Minh Đức Phú Mỹ Hưng', '0');

-- Bảng trạm
INSERT INTO `tram` (`MaTram`, `MaTuyenDuong`, `TenTram`, `x`, `y`, `TrangThaiXoa`) VALUES
('TR000001', 'TD000001', 'Trạm KDC Nam Long', '10.7361', '106.7092', 0),
('TR000002', 'TD000001', 'Trạm Võ Văn Kiệt', '10.7355', '106.7105', 0),
('TR000003', 'TD000002', 'Trạm Phú Mỹ Hưng', '10.7325', '106.7125', 0);

-- Bảng xe buýt
INSERT INTO `xebuyt` (`SoXeBuyt`, `BienSoXe`, `SucChua`, `TrangThaiXe`, `TrangThaiXoa`) VALUES
('BUS01', '51B-12345', '40', 'Đang hoạt động', '0'),
('BUS02', '51B-67890', '35', 'Đang bảo trì', '0');

-- Bảng phân công
INSERT INTO `phancong` (`MaPC`, `MaTX`, `SoXeBuyt`, `MaTD`, `TrangThaiXoa`) VALUES
('PC000001', 'ND000003', 'BUS01', 'TD000001', '0'),
('PC000002', 'ND000004', 'BUS02', 'TD000002', '0');

-- Bảng học sinh
INSERT INTO `hocsinh` (`MaHS`, `MaPH`, `MaTram`, `TenHS`, `Lop`, `TrangThaiXoa`) VALUES
('HS000001', 'PH000001', 'TR000001', 'Nguyễn Minh Khang', '6A1', '0'),
('HS000002', 'PH000002', 'TR000002', 'Nguyễn Ngọc Anh', '7A2', '0'),
('HS000003', 'PH000003', 'TR000003', 'Lê Trọng Tín', '8A1', '0'),
('HS000004', 'PH000004', 'TR000001', 'Nguyễn Hoàng Long', '6A2', '0'),
('HS000005', 'PH000005', 'TR000002', 'Nguyễn Khánh Vy', '6A3', '0'),
('HS000006', 'PH000006', 'TR000003', 'Lê Gia Bảo', '7A1', '0'),
('HS000007', 'PH000007', 'TR000001', 'Nguyễn Minh Anh', '8A1', '0'),
('HS000008', 'PH000008', 'TR000002', 'Nguyễn Quốc Duy', '9A1', '0'),
('HS000009', 'PH000009', 'TR000003', 'Lê Ngọc Hà', '7A2', '0'),
('HS000010', 'PH000010', 'TR000001', 'Nguyễn Khánh Duy', '7A3', '0'),
('HS000011', 'PH000011', 'TR000002', 'Lê Hoàng Phúc', '8A2', '0'),
('HS000012', 'PH000012', 'TR000003', 'Nguyễn Mỹ Duyên', '6A4', '0'),
('HS000013', 'PH000013', 'TR000001', 'Nguyễn Hữu Tài', '7A4', '0'),
('HS000014', 'PH000014', 'TR000002', 'Lê Minh Thư', '8A3', '0'),
('HS000015', 'PH000015', 'TR000003', 'Nguyễn Thanh Bình', '9A2', '0'),
('HS000016', 'PH000016', 'TR000001', 'Lê Văn Nam', '6A5', '0'),
('HS000017', 'PH000017', 'TR000002', 'Nguyễn Thùy Trang', '7A5', '0'),
('HS000018', 'PH000018', 'TR000003', 'Lê Quốc Huy', '8A4', '0'),
('HS000019', 'PH000019', 'TR000001', 'Nguyễn Phương Nhi', '9A3', '0'),
('HS000020', 'PH000020', 'TR000002', 'Lê Anh Khoa', '6A6', '0');

-- Bảng lich trình 
INSERT INTO `lichtrinh` (`MaLT`, `MaTX`, `NgayHanhTrinh`, `CaHanhTrinh`, `TrangThai`, `TrangThaiXoa`) VALUES
('LT000001', 'ND000003', '2025-10-08', 'Sáng (6:30 - 7:30)', '0', '0');

-- Bảng trạm lịch trình
INSERT INTO `tramlichtrinh` (`MaLT`, `MaTram`, `TrangThai`) VALUES
('LT000001', 'TR000001', '0'), 
('LT000001', 'TR000002', '0');  

-- Bảng điểm danh
INSERT INTO `diemdanh` (`MaLT`, `MaHS`, `TrangThai`, `TrangThaiXoa`) VALUES
('LT000001', 'HS000001', '0', '0'),
('LT000001', 'HS000004', '0', '0'),
('LT000001', 'HS000007', '0', '0'),
('LT000001', 'HS000010', '0', '0'),
('LT000001', 'HS000013', '0', '0'),
('LT000001', 'HS000016', '0', '0'),
('LT000001', 'HS000019', '0', '0'),
('LT000001', 'HS000002', '0', '0'),
('LT000001', 'HS000005', '0', '0'),
('LT000001', 'HS000008', '0', '0'),
('LT000001', 'HS000011', '0', '0'),
('LT000001', 'HS000014', '0', '0'),
('LT000001', 'HS000017', '0', '0'),
('LT000001', 'HS000020', '0', '0');