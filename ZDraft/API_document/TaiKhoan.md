# API document - Smart Bus Tracking System

## Authentication Middleware
Phạm vi áp dụng: tất cả api trừ login, register.

### Cách sử dụng:
Authorization: Bearer <JWT_TOKEN>
- Nếu thiếu token: 401 Unauthorized.
- Nếu token không hợp lệ: 403 Forbidden.
****
### Ví dụ:
GET /api/students

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI...

## Account table
  ### POST /account/create
  Tạo account trong bảng account.

  **Request**
  - Method: `POST`
  - URL: `/account/create`
  - Headers:
    - `Content-Type: application/json`
  - Body:
  ```json
  {
    "tenDangNhap": "abc",
    "MatKhau": "123456",
    "MaND": "PH00001"
  }
  ```

  **Respone**
  - Status: `200 OK`: Nếu không trùng tenDangNhap
  ```json
  {
    "message": "Tạo thành công"
  }
  ```

  - Status: `401 Unauthorized`: Nếu trùng tenDangNhap
  ```json
  {
    "message": "Trùng tên đăng nhập"
  }
  ```


  ### POST /account/login
  Đăng nhập người dùng, trả về thông tin cơ bản và accessToken.

  **Request**
  - Method: `POST`
  - URL: `/account/login`
  - Headers:
    - `Content-Type: application/json`
  - Body:
  ```json
  {
    "tenDangNhap": "abc",
    "MatKhau": "123456",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
  }
  ```

  **Respone**
  - Status: `200 OK`: Nếu đúng tài khoản, mật khẩu và TrangThaiXoa = 0
  ```json
  {
    "username": "abc",
    "MaND": "ND00001",
    "token": "<JWT_TOKEN>"
  }
  ```
  - Status: `401 Unauthorized`: Nếu sai tài khoản, mật khẩu hoặc TrangThaiXoa = 1
  ```json
  {
    "message": "Sai tài khoản hoặc mật khẩu"
  }
  ```

  ### PUT /account/update
  Cập nhật bảng tài khoản.

  **Request**
  - Method: `PUT`
  - URL: `/account/update`
  - Headers:
    - `Content-Type: application/json`
  - Body:
  ```json
  {
    "tenDangNhap": "newabc",
    "MatKhau": "new123456",
    "MaND": "PH00001",
    "TrangThaiXoa": 0
  }
  ```
  **Respone**
  - Status: `200 OK`: Nếu cập nhật thành công
  ```json
  {
    "message": "Cập nhật thành công"
  }
  ```

  - Status: `504 Failed`: Nếu thất bại
  ```json
  {
    "message": "Mạng có vấn đề"
  }
  ```

  ### PATCH /account/delete/{tenDangNhap}
  Đánh dấu tài khoản là đã xóa (soft delete).

  **Request**
  - Method: `PATCH`
  - URL: `/account/delete/{tenDangNhap}`
  - Headers:
    - `Content-Type: application/json`
    - `Authorization: Bearer <JWT_TOKEN>`
  - Body:
  ```json
  {
    "TrangThaiXoa": 1
  }
  ```

  **Respone**
  - Status: `200 OK`: Nếu xóa thành công
  ```json
  {
    "message": "Xóa thành công"
  }
  ```

  - Status: `404 NotFound`: Nếu không tìm thấy
  ```json
  {
    "message": "Không thấy tài khoản"
  }
  ```

  - Status: `500 Failed`: Nếu thất bại
  ```json
  {
    "message": "Mạng có vấn đề"
  }
  ```