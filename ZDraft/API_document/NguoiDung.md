## NguoiDung table
### POST /nguoidung/create
Tạo người dùng mới trong bảng NguoiDung.

**Request**
- Method: `POST`
- URL: `/user/create`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer <JWT_TOKEN>`
- Body:
```json
{
    "MaND": "ND00001",
    "MaVT": "VT001",
    "TenND": "Nguyen Van A"
}
```

**Response**
- Status `200 OK`: Nếu tạo thành công
``` json
{
  "message": "Tạo thành công"
}
```
- Status `401 Unauthorized`: Nếu trùng MaND
```json
{
  "message": "Trùng MaND"
}
```

### GET /nguoidung/{MaND}
Lấy thông tin người dùng theo MaND.

**Request**
- Method: GET
- URL: /nguoidung/{MaND}
- Headers:
    - Content-Type: application/json
    - `Authorization: Bearer <JWT_TOKEN>`
**Respone**
- Status `200 OK`: Nếu tìm thấy người dùng
```json
{
  "MaND": "ND00001",
  "MaVT": "VT001",
  "TenND": "Nguyen Van A",
  "TrangThaiXoa": "0"
}
```
- Status `404 NotFound`: Nếu không tìm thấy người dùng
```json
{
  "message": "Không tìm thấy người dùng"
}
```

### GET /nguoidung/vai-tro/{MaVT}
Lấy danh sách tất cả người dùng có cùng **Mã Vai Trò** (`MaVT`).

**Request**
- Method: GET
- URL: /nguoidung/vai-tro/{MaVT}
- Headers:
    - Content-Type: application/json

**Response**
- Status `200 OK`: Nếu tìm thấy danh sách người dùng
```json
[
  {
    "MaND": "ND00001",
    "MaVT": "VT001",
    "TenND": "Nguyen Van A",
    "TrangThaiXoa": "0"
  },
  {
    "MaND": "ND00005",
    "MaVT": "VT001",
    "TenND": "Tran Thi B",
    "TrangThaiXoa": "0"
  }
]
```
### PUT /nguoidung/update/{MaND}
Cập nhật thông tin người dùng.

**Request**
- Method: **PUT**
- URL: `/nguoidung/update/{MaND}`
- Headers:
    - `Content-Type`: `application/json`
    - `Authorization: Bearer <JWT_TOKEN>`
- Body:
```json
{
    "MaND": "PH00001",
    "MaVT": "VT002",
    "TenND": "Nguyen Van B",
    "TrangThaiXoa": 0
}
```

**Response**
- Status `200 OK`: Nếu cập nhật người dùng thành công
```json
  {
    "message": "Update thành công" 
  }
```

Tự xử lý các mã lỗi 404 (không tìm thấy) && 500 (kết nối có vấn đề)

### PATCH /nguoidung/delete/{MaND}
Đánh dấu người dùng là đã xóa bằng cách cập nhật trường TrangThaiXoa thành 1.

**Request**
- Method: **PATCH**
- URL: `/nguoidung/delete/{MaND}`
- Headers:
    - `Content-Type`: `application/json`
    - `Authorization`: `Bearer <JWT_TOKEN>`
- Body:
```json
{
  "TrangThaiXoa": 1

}
```

**Response**
- Status `200 OK`: Nếu cập nhật người dùng thành công
```json
  {
    "message": "Xóa thành công" 
  }
```

Tự xử lý các mã lỗi 404 (không tìm thấy) && 500 (kết nối có vấn đề)