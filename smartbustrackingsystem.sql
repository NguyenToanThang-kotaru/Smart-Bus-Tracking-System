-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 23, 2025 lúc 07:56 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

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

--
-- Đang đổ dữ liệu cho bảng `hocsinh`
--

INSERT INTO `hocsinh` (`MaHS`, `MaPH`, `MaTram`, `TenHS`, `Lop`, `TrangThaiXoa`) VALUES
('HS000001', 'PH000001', 'TR000001', 'Nguyễn Minh Khang', '6A1', '0'),
('HS000002', 'PH000002', 'TR000002', 'Nguyễn Ngọc Anh', '7A2', '0'),
('HS000003', 'PH000003', 'TR000003', 'Lê Trọng Tín', '8B1', '0'),
('HS000004', 'PH000004', 'TR000001', 'Nguyễn Hoàng Long', '6A2', '0'),
('HS000005', 'PH000005', 'TR000002', 'Nguyễn Khánh Vy', '6A3', '0'),
('HS000006', 'PH000006', 'TR000003', 'Lê Gia Bảo', '7B1', '0'),
('HS000007', 'PH000007', 'TR000001', 'Nguyễn Minh Anh', '8A1', '0'),
('HS000008', 'PH000008', 'TR000002', 'Nguyễn Quốc Duy', '9A1', '0'),
('HS000009', 'PH000009', 'TR000003', 'Lê Ngọc Hà', '6B2', '0'),
('HS000010', 'PH000010', 'TR000001', 'Nguyễn Khánh Duy', '7A3', '0'),
('HS000011', 'PH000011', 'TR000002', 'Lê Hoàng Phúc', '8B2', '0'),
('HS000012', 'PH000012', 'TR000003', 'Nguyễn Mỹ Duyên', '6A4', '0'),
('HS000013', 'PH000013', 'TR000001', 'Nguyễn Hữu Tài', '7A4', '0'),
('HS000014', 'PH000014', 'TR000002', 'Lê Minh Thư', '8B3', '0'),
('HS000015', 'PH000015', 'TR000003', 'Nguyễn Thanh Bình', '9A2', '0'),
('HS000016', 'PH000016', 'TR000001', 'Lê Văn Nam', '6A5', '0'),
('HS000017', 'PH000017', 'TR000002', 'Nguyễn Thùy Trang', '7A5', '0'),
('HS000018', 'PH000018', 'TR000003', 'Lê Quốc Huy', '8B4', '0'),
('HS000019', 'PH000019', 'TR000001', 'Nguyễn Phương Nhi', '9A3', '0'),
('HS000020', 'PH000020', 'TR000002', 'Lê Anh Khoa', '6A6', '0');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `hocsinh`
--
ALTER TABLE `hocsinh`
  ADD PRIMARY KEY (`MaHS`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
