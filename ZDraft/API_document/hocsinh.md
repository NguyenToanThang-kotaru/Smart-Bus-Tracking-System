## hocsinh table
### POST /hocsinh/create
Tạo người dùng mới trong bảng HocSinh.

**Request**
- Method: `POST`
- URL: `/hocsinh/create`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer <JWT_TOKEN>`
- Body:
```json
{
    "MaHS": "HS00001",
    "MaPH": "PH00001",
    "MaTram": "TR00001",
    "TenHS": "Nguyen Van A",
    "Lop": "1A1",
    "TrangThaiXoa": 0
}
```

Mã lỗi:
- `200`: Ok
- `401`: Trùng số điện thoại 
- `500`: lỗi mạng

### GET /hocsinh/
Lấy thông tin học sinh

**Request**
- Method: `GET`
- URL: `/hocsinh/`
- Headers:
  - `Authorization: Bearer <JWT_TOKEN>`

**Response (Success)**
- Status: `200 OK`
- Body:
```json
[
    {
        "MaHS": "HS00001",
        "MaPH": "PH00001",
        "MaTram": "TR00001",
        "TenHS": "Nguyen Van A",
        "Lop": "1A1",
        "TrangThaiXoa": 0
    },
    {
        "MaHS": "HS00002",
        "MaPH": "PH00002",
        "MaTram": "TR00001",
        "TenHS": "Nguyen Van B",
        "Lop": "1A1",
        "TrangThaiXoa": 0
    }
]
```
- `200`: Ok
- `500`: lỗi mạng

### GET /hocsinh/{MaPH}
Lấy thông tin chi tiết các học sinh dựa trên mã phụ huynh (`MaPH`).

**Request**
- Method: `GET`
- URL: `/hocsinh/{PH}` (Ví dụ: `/hocsinh/PH00001`)
- Headers:
  - `Authorization: Bearer <JWT_TOKEN>`

**Response (Success)**
- Status: `200 OK`
- Body:
```json
[
    {
        "MaHS": "HS00001",
        "MaPH": "PH00002",
        "MaTram": "TR00001",
        "TenHS": "Nguyen Van A",
        "Lop": "1A1",
        "TrangThaiXoa": 0
    },
    {
        "MaHS": "HS00002",
        "MaPH": "PH00002",
        "MaTram": "TR00001",
        "TenHS": "Nguyen Van B",
        "Lop": "1A1",
        "TrangThaiXoa": 0
    }
]
```

### GET /hocsinh/{MaHS}
Lấy thông tin chi tiết của một học sinh dựa trên mã học sinh (`MaHS`).

**Request**
- Method: `GET`
- URL: `/hocsinh/{MaHS}` (Ví dụ: `/hocsinh/HS00001`)
- Headers:
  - `Authorization: Bearer <JWT_TOKEN>`

**Response (Success)**
- Status: `200 OK`
- Body:
```json
    {
        "MaHS": "HS00002",
        "MaPH": "PH00002",
        "MaTram": "TR00001",
        "TenHS": "Nguyen Van B",
        "Lop": "1A1",
        "TrangThaiXoa": 0
    }
```

### GET /hocsinh/{MaTram}
Lấy thông tin chi tiết của các học sinh dựa trên mã trạm (`MaTram`).
**Request**
- Method: `GET`
- URL: `/hocsinh/{MaTram}` (Ví dụ: `/hocsinh/TR00001`)
- Headers:
  - `Authorization: Bearer <JWT_TOKEN>`

**Response (Success)**
- Status: `200 OK`
- Body:
```json
[    {
        "MaHS": "HS00002",
        "MaPH": "PH00002",
        "MaTram": "TR00001",
        "TenHS": "Nguyen Van B",
        "Lop": "1A1",
        "TrangThaiXoa": 0
    },
    {
        "MaHS": "HS00002",
        "MaPH": "PH00002",
        "MaTram": "TR00001",
        "TenHS": "Nguyen Van B",
        "Lop": "1A1",
        "TrangThaiXoa": 0
    }    
]
```

### PUT /hocsinh/update/{MaHS}
Cập nhật thông tin của một học sinh đã tồn tại.

**Request**
- Method: `PUT`
- URL: `/hocsinh/update/{MaHS}` (Ví dụ: `/hocsinh/update/HS00001`)
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer <JWT_TOKEN>`
- Body:
```json
{
    "MaHS": "HS00001",
    "MaPH": "PH00001",
    "MaTram": "TR00001",
    "TenHS": "Nguyen Van A",
    "Lop": "1A1",
    "TrangThaiXoa": 0
}
```

Mã lỗi:
- `200`: Ok
- `401`: Không tìm thấy học sinh
- `500`: lỗi mạng


### PATCH /hocsinh/delete/{MaHS}
Cập nhật thông tin của một học sinh đã tồn tại.

**Request**
- Method: `PATCH`
- URL: `/hocsinh/delete/{MaHS}`
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
- `401`: Không tìm thấy học sinh
- `500`: lỗi mạng