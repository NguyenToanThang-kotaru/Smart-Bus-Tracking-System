## PhuHuynh table
### POST /phuhuynh/create
Tạo người dùng mới trong bảng PhuHuynh.

**Request**
- Method: `POST`
- URL: `/phuhuynh/create`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer <JWT_TOKEN>`
- Body:
```json
{
    "MaPH": "PH00001",
    "SdtPH": "0900012345"
}
```

Mã lỗi:
- `200`: Ok
- `401`: Trùng số điện thoại 
- `500`: lỗi mạng

### GET /phuhuynh/
Lấy thông tin phụ huynh
**Request**
- Method: `GET`
- URL: `/phuhuynh/`
- Headers:
  - `Authorization: Bearer <JWT_TOKEN>`

**Response (Success)**
- Status: `200 OK`
- Body:
```json
[
    {
      "MaPH": "PH00001",
      "SdtPH": "0900012345",
      "TenNguoiDung": "Nguyễn Văn A"
    },
    {
      "MaPH": "PH00002",
      "SdtPH": "0900012346",
      "TenNguoiDung": "Nguyễn Văn B"
    }
]
```
- `200`: Ok
- `500`: lỗi mạng

### GET /phuhuynh/{MaPH}
Lấy thông tin chi tiết của một phụ huynh dựa trên mã phụ huynh (`MaPH`).

**Request**
- Method: `GET`
- URL: `/phuhuynh/{MaPH}` (Ví dụ: `/phuhuynh/PH00001`)
- Headers:
  - `Authorization: Bearer <JWT_TOKEN>`

**Response (Success)**
- Status: `200 OK`
- Body:
```json
{
  "MaPH": "PH00001",
  "SdtPH": "0900012345",
  "TenNguoiDung": "Nguyễn Văn A"
}
```
- `200`: Ok
- `500`: lỗi mạng

### PUT /phuhuynh/update/{MaPH}
Cập nhật thông tin của một phụ huynh đã tồn tại.

**Request**
- Method: `PUT`
- URL: `/phuhuynh/update/{MaPH}` (Ví dụ: `/phuhuynh/update/PH00001`)
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer <JWT_TOKEN>`
- Body:
```json
{
    "MaPH":"PH00001",
    "SdtPH": "0911223344",
    "TrangThaiXoa": 0
}
```

Mã lỗi:
- `200`: Ok
- `401`: Không tìm thấy phụ huynh
- `500`: lỗi mạng


### PATCH /phuhuynh/update/{MaPH}
Cập nhật trạng thái xóa của một phụ huynh đã tồn tại.

**Request**
- Method: `PUT`
- URL: `/phuhuynh/delete/{MaPH}`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer <JWT_TOKEN>`
- Body:
```json
{
  "TrangThaiXoa": 1
}
```

Mã lỗi:
- `200`: Ok
- `401`: Không tìm thấy phụ huynh
- `500`: lỗi mạng