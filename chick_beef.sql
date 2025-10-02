-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 31, 2025 lúc 11:07 AM
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
-- Cơ sở dữ liệu: `chick_beef`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ban`
--

CREATE TABLE `ban` (
  `MaBan` varchar(10) NOT NULL,
  `SoBan` varchar(10) NOT NULL,
  `SucChua` varchar(3) NOT NULL,
  `ThoiGianGiuBan` varchar(20) NOT NULL,
  `TrangThai` varchar(20) NOT NULL,
  `IsDeleted` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ban`
--

INSERT INTO `ban` (`MaBan`, `SoBan`, `SucChua`, `ThoiGianGiuBan`, `TrangThai`, `IsDeleted`) VALUES
('B00001', '1', '4', '', 'Trống', '0'),
('B00002', '2', '6', '2025-08-27 12:30:00', 'Đang sử dụng', '0'),
('B00003', '3', '2', '2025-08-27 13:00:00', 'Đặt trước', '0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitiethd`
--

CREATE TABLE `chitiethd` (
  `MaHD` varchar(10) NOT NULL,
  `MaSP` varchar(10) NOT NULL,
  `SoLuongSP` varchar(5) NOT NULL,
  `DonGia` varchar(15) NOT NULL,
  `ThanhTien` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitiethd`
--

INSERT INTO `chitiethd` (`MaHD`, `MaSP`, `SoLuongSP`, `DonGia`, `ThanhTien`) VALUES
('HD00001', 'SP00001', '2', '45000', '90000'),
('HD00001', 'SP00004', '1', '10000', '20000'),
('HD00001', 'SP00003', '1', '35000', '35000'),
('HD00002', 'SP00002', '1', '48000', '48000'),
('HD00002', 'SP00004', '1', '20000', '20000'),
('HD00003', 'SP00002', '2', '48000', '96000'),
('HD00003', 'SP00005', '1', '45000', '45000'),
('HD00004', 'SP00001', '1', '45000', '45000'),
('HD00004', 'SP00003', '2', '35000', '70000'),
('HD00004', 'SP00004', '1', '20000', '20000'),
('HD00005', 'SP00002', '3', '48000', '144000'),
('HD00005', 'SP00005', '2', '45000', '90000');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietnhacungcap`
--

CREATE TABLE `chitietnhacungcap` (
  `MaNCC` varchar(10) NOT NULL,
  `MaNL` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietnhacungcap`
--

INSERT INTO `chitietnhacungcap` (`MaNCC`, `MaNL`) VALUES
('NCC00001', 'NL00001'),
('NCC00001', 'NL00002'),
('NCC00002', 'NL00003'),
('NCC00002', 'NL00004'),
('NCC00002', 'NL00005');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietphieunhap`
--

CREATE TABLE `chitietphieunhap` (
  `MaPN` varchar(10) NOT NULL,
  `MaNL` varchar(10) NOT NULL,
  `SoLuongNL` varchar(10) NOT NULL,
  `GiaNhapNL` varchar(15) NOT NULL,
  `ThanhTien` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietphieunhap`
--

INSERT INTO `chitietphieunhap` (`MaPN`, `MaNL`, `SoLuongNL`, `GiaNhapNL`, `ThanhTien`) VALUES
('PN00001', 'NL00001', '20', '80000', '1600000'),
('PN00001', 'NL00002', '10', '70000', '700000'),
('PN00002', 'NL00003', '50', '10000', '500000'),
('PN00002', 'NL00004', '20', '30000', '600000'),
('PN00002', 'NL00005', '40', '10000', '400000');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietquyen`
--

CREATE TABLE `chitietquyen` (
  `MaQuyen` varchar(10) NOT NULL,
  `MaCN` varchar(10) NOT NULL,
  `MaHanhDong` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietquyen`
--

INSERT INTO `chitietquyen` (`MaQuyen`, `MaCN`, `MaHanhDong`) VALUES
('Q00001', 'CN00001', 'HDONG00001'),
('Q00001', 'CN00001', 'HDONG00002'),
('Q00001', 'CN00001', 'HDONG00003'),
('Q00001', 'CN00001', 'HDONG00004'),
('Q00001', 'CN00002', 'HDONG00001'),
('Q00001', 'CN00002', 'HDONG00002'),
('Q00001', 'CN00002', 'HDONG00003'),
('Q00001', 'CN00002', 'HDONG00004'),
('Q00001', 'CN00003', 'HDONG00001'),
('Q00001', 'CN00003', 'HDONG00002'),
('Q00001', 'CN00003', 'HDONG00003'),
('Q00001', 'CN00003', 'HDONG00004'),
('Q00001', 'CN00004', 'HDONG00001'),
('Q00001', 'CN00004', 'HDONG00002'),
('Q00001', 'CN00004', 'HDONG00003'),
('Q00001', 'CN00004', 'HDONG00004'),
('Q00002', 'CN00003', 'HDONG00001'),
('Q00002', 'CN00003', 'HDONG00002'),
('Q00002', 'CN00003', 'HDONG00004'),
('Q00003', 'CN00001', 'HDONG00001'),
('Q00003', 'CN00001', 'HDONG00002'),
('Q00003', 'CN00001', 'HDONG00004'),
('Q00003', 'CN00004', 'HDONG00001'),
('Q00003', 'CN00004', 'HDONG00002'),
('Q00003', 'CN00004', 'HDONG00004'),
('Q00004', 'CN00005', 'HDONG00001'),
('Q00004', 'CN00005', 'HDONG00002'),
('Q00004', 'CN00005', 'HDONG00004');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chucnang`
--

CREATE TABLE `chucnang` (
  `MaCN` varchar(10) NOT NULL,
  `TenCN` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chucnang`
--

INSERT INTO `chucnang` (`MaCN`, `TenCN`) VALUES
('CN00001', 'Quản lý sản phẩm'),
('CN00002', 'Quản lý nhân viên'),
('CN00003', 'Tạo hóa đơn'),
('CN00004', 'Quản lý nhập kho'),
('CN00005', 'Quản lý bếp');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `congthuc`
--

CREATE TABLE `congthuc` (
  `MaSP` varchar(10) NOT NULL,
  `MaNL` varchar(10) NOT NULL,
  `DinhLuongNL` varchar(10) NOT NULL,
  `IsDeleted` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `congthuc`
--

INSERT INTO `congthuc` (`MaSP`, `MaNL`, `DinhLuongNL`, `IsDeleted`) VALUES
('SP00001', 'NL00001', '1', '0'),
('SP00001', 'NL00003', '1', '0'),
('SP00001', 'NL00004', '1', '0'),
('SP00001', 'NL00005', '1', '0'),
('SP00002', 'NL00002', '1', '0'),
('SP00002', 'NL00003', '1', '0'),
('SP00002', 'NL00004', '1', '0'),
('SP00002', 'NL00005', '1', '0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhmucsanpham`
--

CREATE TABLE `danhmucsanpham` (
  `MaSP` varchar(10) NOT NULL,
  `MaLDM` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `danhmucsanpham`
--

INSERT INTO `danhmucsanpham` (`MaSP`, `MaLDM`) VALUES
('SP00001', 'LDM00001'),
('SP00002', 'LDM00001'),
('SP00003', 'LDM00002'),
('SP00004', 'LDM00002'),
('SP00005', 'LDM00002'),
('SP00006', 'LDM00003'),
('SP00007', 'LDM00004'),
('SP00008', 'LDM00001');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `datban`
--

CREATE TABLE `datban` (
  `MaDB` varchar(10) NOT NULL,
  `MaBan` varchar(10) NOT NULL,
  `ThoiGian` varchar(20) NOT NULL,
  `MaKH` varchar(10) NOT NULL,
  `IsDeleted` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `datban`
--

INSERT INTO `datban` (`MaDB`, `MaBan`, `ThoiGian`, `MaKH`, `IsDeleted`) VALUES
('DB00001', 'B00001', '2028-02-29 00:00:00', 'KH00001', '1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hanhdong`
--

CREATE TABLE `hanhdong` (
  `MaHanhDong` varchar(10) NOT NULL,
  `TenHanhDong` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hanhdong`
--

INSERT INTO `hanhdong` (`MaHanhDong`, `TenHanhDong`) VALUES
('HDONG00001', 'Thêm'),
('HDONG00002', 'Sửa'),
('HDONG00003', 'Xóa'),
('HDONG00004', 'Xem');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadon`
--

CREATE TABLE `hoadon` (
  `MaHD` varchar(10) NOT NULL,
  `MaNV` varchar(10) NOT NULL,
  `MaKH` varchar(10) NOT NULL,
  `TongTien` varchar(15) NOT NULL,
  `NgayXuat` varchar(10) NOT NULL,
  `TrangThai` varchar(20) NOT NULL DEFAULT 'Chưa thanh toán'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hoadon`
--

INSERT INTO `hoadon` (`MaHD`, `MaNV`, `MaKH`, `TongTien`, `NgayXuat`, `TrangThai`) VALUES
('HD00001', 'NV00001', 'KH00001', '75000', '2025-08-27', 'Chưa thanh toán'),
('HD00002', 'NV00002', 'KH00002', '50000', '2025-08-27', 'Chưa thanh toán'),
('HD00003', 'NV00001', 'KH00001', '82000', '2025-08-28', 'Chưa thanh toán'),
('HD00004', 'NV00001', 'KH00001', '150000', '2025-08-29', 'Chưa thanh toán'),
('HD00005', 'NV00002', 'KH00002', '64000', '2025-08-29', 'Chưa thanh toán');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadonban`
--

CREATE TABLE `hoadonban` (
  `MaHD` varchar(10) NOT NULL,
  `MaBan` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hoadonban`
--

INSERT INTO `hoadonban` (`MaHD`, `MaBan`) VALUES
('HD00001', 'B00001'),
('HD00003', 'B00002'),
('HD00004', 'B00001'),
('HD00005', 'B00002');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khachhang`
--

CREATE TABLE `khachhang` (
  `MaKH` varchar(10) NOT NULL,
  `TenKH` varchar(100) NOT NULL,
  `SDT` varchar(12) NOT NULL,
  `DiaChi` varchar(200) DEFAULT NULL,
  `IsDeleted` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khachhang`
--

INSERT INTO `khachhang` (`MaKH`, `TenKH`, `SDT`, `DiaChi`, `IsDeleted`) VALUES
('KH00001', 'Nguyễn Văn A', '0901234567', 'Hà Nội', '0'),
('KH00002', 'Trần Thị B', '0902345678', 'Hồ Chí Minh', '0'),
('KH00003', 'Lê Văn C', '0903456789', 'Đà Nẵng', '0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `kho`
--

CREATE TABLE `kho` (
  `MaCTPN` varchar(10) NOT NULL,
  `SoLuongTon` varchar(10) NOT NULL,
  `NgayHetHan` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `kho`
--

INSERT INTO `kho` (`MaCTPN`, `SoLuongTon`, `NgayHetHan`) VALUES
('CTPN00001', '16', '2026-08-31');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaidanhmuc`
--

CREATE TABLE `loaidanhmuc` (
  `MaLDM` varchar(10) NOT NULL,
  `TenLDM` varchar(100) NOT NULL,
  `IsDeleted` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `loaidanhmuc`
--

INSERT INTO `loaidanhmuc` (`MaLDM`, `TenLDM`, `IsDeleted`) VALUES
('LDM00001', 'Gà rán', '0'),
('LDM00002', 'Combo', '0'),
('LDM00003', 'Đồ uống', '0'),
('LDM00004', 'Tráng miệng', '0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguyenlieu`
--

CREATE TABLE `nguyenlieu` (
  `MaNL` varchar(10) NOT NULL,
  `TenNL` varchar(100) NOT NULL,
  `DonViNL` varchar(20) NOT NULL,
  `SoLuongTon` varchar(10) NOT NULL DEFAULT '0',
  `IsDeleted` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nguyenlieu`
--

INSERT INTO `nguyenlieu` (`MaNL`, `TenNL`, `DonViNL`, `SoLuongTon`, `IsDeleted`) VALUES
('NL00001', 'Đùi gà', 'kg', '50', '0'),
('NL00002', 'Cánh gà', 'kg', '30', '0'),
('NL00003', 'Bột chiên giòn', 'gói', '100', '0'),
('NL00004', 'Dầu ăn', 'lít', '40', '0'),
('NL00005', 'Gia vị (muối, tiêu, ớt bột)', 'gói', '80', '0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhacungcap`
--

CREATE TABLE `nhacungcap` (
  `MaNCC` varchar(10) NOT NULL,
  `TenNCC` varchar(100) NOT NULL,
  `DiaChi` varchar(200) NOT NULL,
  `SDT` varchar(12) NOT NULL,
  `IsDeleted` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhacungcap`
--

INSERT INTO `nhacungcap` (`MaNCC`, `TenNCC`, `DiaChi`, `SDT`, `IsDeleted`) VALUES
('NCC00001', 'Công ty CP Thực Phẩm Gà Việt', 'Hà Nội', '0912345678', '0'),
('NCC00002', 'Nhà cung cấp Gia Vị Nam Á', 'TP. Hồ Chí Minh', '0987654321', '0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanvien`
--

CREATE TABLE `nhanvien` (
  `MaNV` varchar(10) NOT NULL,
  `TenNV` varchar(100) NOT NULL,
  `DiaChi` varchar(200) NOT NULL,
  `SDT` varchar(12) NOT NULL,
  `MaVT` varchar(10) NOT NULL,
  `IsDeleted` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`MaNV`, `TenNV`, `DiaChi`, `SDT`, `MaVT`, `IsDeleted`) VALUES
('NV00001', 'Nguyễn Văn A', 'abc', '0987654321', 'VT00001', '0'),
('NV00002', 'Nguyễn Văn B', 'Hà Nội', '0912345678', 'VT00002', '0'),
('NV00003', 'Trần Thị C', 'Hồ Chí Minh', '0987654321', 'VT00003', '0'),
('NV00004', 'Nguyễn Văn A', '123 Nguyễn Trãi, Hà Nội', '0987654322', 'VT00002', '1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieunhap`
--

CREATE TABLE `phieunhap` (
  `MaPN` varchar(10) NOT NULL,
  `MaNV` varchar(10) NOT NULL,
  `MaNCC` varchar(10) NOT NULL,
  `TongTien` varchar(15) NOT NULL,
  `NgayNhap` varchar(10) NOT NULL,
  `TrangThai` varchar(20) NOT NULL DEFAULT 'Chưa xác nhận'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phieunhap`
--

INSERT INTO `phieunhap` (`MaPN`, `MaNV`, `MaNCC`, `TongTien`, `NgayNhap`, `TrangThai`) VALUES
('PN00001', 'NV00003', 'NCC00001', '3000000', '2025-08-01', 'Chưa xác nhận'),
('PN00002', 'NV00003', 'NCC00002', '1500000', '2025-08-15', 'Chưa xác nhận');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quyen`
--

CREATE TABLE `quyen` (
  `MaQuyen` varchar(10) NOT NULL,
  `TenQuyen` varchar(50) NOT NULL,
  `IsDeleted` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `quyen`
--

INSERT INTO `quyen` (`MaQuyen`, `TenQuyen`, `IsDeleted`) VALUES
('Q00001', 'Admin', '0'),
('Q00002', 'Bán hàng', '0'),
('Q00003', 'Quản lý kho', '0'),
('Q00004', 'Quản lý bếp', '0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `MaSP` varchar(10) NOT NULL,
  `TenSP` varchar(50) NOT NULL,
  `GiaSP` varchar(15) NOT NULL,
  `MoTaSP` varchar(255) NOT NULL,
  `AnhSP` varchar(255) NOT NULL,
  `IsDeleted` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`MaSP`, `TenSP`, `GiaSP`, `MoTaSP`, `AnhSP`, `IsDeleted`) VALUES
('SP00001', 'Gà rán truyền thống', '45000', 'Miếng gà rán giòn rụm', 'ga_ran_truyen_thong.jpg', '0'),
('SP00002', 'Gà rán cay', '50000', 'Miếng gà rán vị cay đặc trưng', 'ga_ran_cay.jpg', '0'),
('SP00003', 'Combo 1 người', '85000', '1 miếng gà + khoai tây chiên + nước ngọt', 'combo_1_nguoi.jpg', '0'),
('SP00004', 'Combo gia đình', '250000', '6 miếng gà + khoai tây chiên + 1.5L Pepsi', 'combo_gia_dinh.jpg', '0'),
('SP00005', 'Khoai tây chiên', '30000', 'Khoai tây chiên giòn', 'khoai_tay_chien.jpg', '0'),
('SP00006', 'Pepsi lon', '15000', 'Nước ngọt Pepsi lon 330ml', 'pepsi.jpg', '0'),
('SP00007', 'Kem vani', '20000', 'Kem vani mát lạnh', 'kem_vani.jpg', '0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `TenDangNhap` varchar(50) NOT NULL,
  `MatKhau` varchar(50) NOT NULL,
  `MaNV` varchar(10) NOT NULL,
  `MaQuyen` varchar(10) NOT NULL,
  `IsDeleted` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`TenDangNhap`, `MatKhau`, `MaNV`, `MaQuyen`, `IsDeleted`) VALUES
('NV00001', 'NV00001', 'NV00001', 'Q00001', '0'),
('NV00002', 'NV00002', 'NV00002', 'Q00002', '0'),
('NV00003', 'NV00003', 'NV00003', 'Q00003', '0'),
('NV00004', 'NV00004', 'NV00004', 'Q00004', '0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thanhtoan`
--

CREATE TABLE `thanhtoan` (
  `MaTT` varchar(10) NOT NULL,
  `PhuongThucTT` varchar(20) NOT NULL,
  `MaHD` varchar(10) NOT NULL,
  `ThoiGianTT` varchar(20) NOT NULL,
  `SoTienTra` varchar(15) NOT NULL,
  `SoTienThoi` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `thanhtoan`
--

INSERT INTO `thanhtoan` (`MaTT`, `PhuongThucTT`, `MaHD`, `ThoiGianTT`, `SoTienTra`, `SoTienThoi`) VALUES
('TT00001', 'Tiền mặt', 'HD00001', '2025-08-27 20:00:00', '145000', '0'),
('TT00002', 'Thẻ ngân hàng', 'HD00002', '2025-08-27 21:00:00', '68000', '0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vaitro`
--

CREATE TABLE `vaitro` (
  `MaVT` varchar(10) NOT NULL,
  `TenVT` varchar(100) NOT NULL,
  `IsDeleted` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `vaitro`
--

INSERT INTO `vaitro` (`MaVT`, `TenVT`, `IsDeleted`) VALUES
('VT00001', 'Quản lý', '0'),
('VT00002', 'Nhân viên bán hàng', '0'),
('VT00003', 'Nhân viên kho', '0'),
('VT00004', 'Nhân viên bếp', '0');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `ban`
--
ALTER TABLE `ban`
  ADD PRIMARY KEY (`MaBan`);

--
-- Chỉ mục cho bảng `chucnang`
--
ALTER TABLE `chucnang`
  ADD PRIMARY KEY (`MaCN`);

--
-- Chỉ mục cho bảng `datban`
--
ALTER TABLE `datban`
  ADD PRIMARY KEY (`MaDB`);

--
-- Chỉ mục cho bảng `hanhdong`
--
ALTER TABLE `hanhdong`
  ADD PRIMARY KEY (`MaHanhDong`);

--
-- Chỉ mục cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`MaHD`);

--
-- Chỉ mục cho bảng `hoadonban`
--
ALTER TABLE `hoadonban`
  ADD UNIQUE KEY `MaHD` (`MaHD`);

--
-- Chỉ mục cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`MaKH`),
  ADD UNIQUE KEY `SDT` (`SDT`),
  ADD UNIQUE KEY `SDT_2` (`SDT`);

--
-- Chỉ mục cho bảng `loaidanhmuc`
--
ALTER TABLE `loaidanhmuc`
  ADD PRIMARY KEY (`MaLDM`);

--
-- Chỉ mục cho bảng `nguyenlieu`
--
ALTER TABLE `nguyenlieu`
  ADD PRIMARY KEY (`MaNL`);

--
-- Chỉ mục cho bảng `nhacungcap`
--
ALTER TABLE `nhacungcap`
  ADD PRIMARY KEY (`MaNCC`);

--
-- Chỉ mục cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`MaNV`);

--
-- Chỉ mục cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD PRIMARY KEY (`MaPN`);

--
-- Chỉ mục cho bảng `quyen`
--
ALTER TABLE `quyen`
  ADD PRIMARY KEY (`MaQuyen`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`MaSP`);

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`TenDangNhap`);

--
-- Chỉ mục cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD PRIMARY KEY (`MaTT`);

--
-- Chỉ mục cho bảng `vaitro`
--
ALTER TABLE `vaitro`
  ADD PRIMARY KEY (`MaVT`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
