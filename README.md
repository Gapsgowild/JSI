# Bloom & Petals - Website Thương Mại Điện Tử Cửa Hàng Hoa

Chào mừng đến với dự án **Bloom & Petals**! Đây là một ứng dụng web thương mại điện tử hiện đại, đáp ứng (responsive) dành cho cửa hàng hoa, được xây dựng bằng JavaScript thuần, HTML, CSS và Firebase.

## 🌟 Tính Năng

*   **Xác Thực Người Dùng**: Đăng nhập và Đăng ký bảo mật sử dụng Firebase Authentication.
    *   Kiểm tra tính hợp lệ của biểu mẫu (độ mạnh mật khẩu, khớp mật khẩu xác nhận).
    *   Bảo vệ các tuyến đường (yêu cầu đăng nhập để thanh toán).
*   **Danh Mục Sản Phẩm**: Danh sách sản phẩm động được lấy từ **Firebase Firestore**.
    *   Dữ liệu mẫu dự phòng nếu Firestore trống.
    *   Modal chi tiết sản phẩm hỗ trợ hiển thị emoji/hình ảnh.
*   **Giỏ Hàng**:
    *   **Trang Giỏ Hàng Riêng Biệt** (`cart.html`) để quản lý các mặt hàng.
    *   Thêm vào giỏ hàng, tăng/giảm số lượng, xóa sản phẩm.
    *   Lưu trữ dữ liệu bền vững sử dụng **Local Storage** (Lưu trữ cục bộ).
*   **Hệ Thống Thanh Toán**:
    *   Biểu mẫu thanh toán bảo mật.
    *   Tạo đơn hàng và lưu trữ trong bộ sưu tập `orders` trên Firestore.
*   **Lịch Sử Đơn Hàng**:
    *   **Trang Lịch Sử** riêng biệt (`history.html`) để xem các đơn hàng đã đặt.
    *   Lấy dữ liệu thời gian thực các đơn hàng của người dùng từ Firestore.
*   **Thiết Kế Responsive**: Tối ưu hóa hoàn toàn cho máy tính để bàn và thiết bị di động.

## 📂 Cấu Trúc Dự Án

```
/
├── index.html          # Trang chủ chính (Cửa hàng)
├── cart.html           # Trang Giỏ hàng riêng biệt
├── history.html        # Trang Lịch sử đơn hàng của người dùng
├── login.html          # Trang Đăng nhập
├── register.html       # Trang Đăng ký
├── README.md           # Tài liệu dự án
├── css/
│   ├── styles.css      # Các kiểu (styles) chung
│   ├── login.css       # Kiểu riêng cho trang Đăng nhập
│   └── register.css    # Kiểu riêng cho trang Đăng ký
└── js/
    ├── firebase-config.js  # Khởi tạo & cấu hình Firebase
    ├── app.js              # Logic cốt lõi (Sản phẩm, Thanh toán, UI Xác thực)
    ├── cart.js             # Logic quản lý giỏ hàng
    ├── history.js          # Logic lấy lịch sử đơn hàng
    ├── login.js            # Logic biểu mẫu đăng nhập
    └── register.js         # Logic biểu mẫu đăng ký
```

## 🛠️ Công Nghệ Sử Dụng

*   **Frontend**: HTML5, CSS3 (Biến tùy chỉnh, Flexbox/Grid), JavaScript (ES6+).
*   **Backend / Cơ sở dữ liệu**: Firebase Firestore (Cơ sở dữ liệu NoSQL).
*   **Xác thực**: Firebase Authentication.
*   **Lưu trữ**: Browser LocalStorage (cho Giỏ hàng).

## 🚀 Hướng Dẫn Cài Đặt

1.  **Clone hoặc Tải xuống** kho lưu trữ dự án.
2.  **Cấu hình Firebase**:
    *   Tạo một dự án trên [Firebase Console](https://console.firebase.google.com/).
    *   Kích hoạt **Authentication** (Nhà cung cấp Email/Password).
    *   Kích hoạt **Firestore Database** (Tạo cơ sở dữ liệu ở chế độ Test Mode hoặc thiết lập quy tắc cho phép đọc/ghi).
    *   Sao chép đối tượng cấu hình Firebase (Firebase config object) của bạn.
    *   Dán nó vào file `js/firebase-config.js` (thay thế các giá trị giữ chỗ).
3.  **Chạy Cục Bộ (Locally)**:
    *   Bạn phải phục vụ các tệp tin bằng một máy chủ cục bộ (mở trực tiếp `index.html` có thể bị chặn một số tính năng do CORS hoặc bảo mật module).
    *   Khuyên dùng: Tiện ích mở rộng **Live Server** trong VS Code.
4.  **Thiết lập Cơ sở dữ liệu** (Tùy chọn nhưng được khuyến nghị):
    *   Tạo một bộ sưu tập (collection) tên là `products` trong Firestore.
    *   Thêm các tài liệu (documents) với các trường: `name` (chuỗi), `price` (số), `description` (chuỗi), `emoji` (chuỗi).
    *   *Lưu ý: Nếu không có sản phẩm nào tồn tại, ứng dụng sẽ tự động tải dữ liệu mẫu.*

## 💻 Tổng Quan Về Logic Chính

*   **Logic Giỏ Hàng (`js/cart.js`)**:
    *   Quản lý mảng `cart` toàn cục.
    *   Lưu vào `localStorage` mỗi khi có thay đổi (`saveCart()`).
    *   Xử lý hiển thị cho cả popup/header và trang `cart.html` đầy đủ.
*   **Xác Thực (`js/app.js` & `firebase-config.js`)**:
    *   Theo dõi trạng thái xác thực bằng `auth.onAuthStateChanged`.
    *   Cập nhật UI (Nút Đăng nhập/Đăng xuất, Hiển thị Email người dùng) trên toàn cục.
    *   Ngăn chặn thanh toán nếu `currentUser` là null.
*   **Đơn Hàng (`js/app.js` & `js/history.js`)**:
    *   Thanh toán sẽ tạo một tài liệu trong bộ sưu tập `orders` với `userId`.
    *   Trang Lịch sử truy vấn `orders` nơi `userId == currentUser.uid` để hiển thị lịch sử cá nhân.

## 🎨 Tùy Chỉnh

*   **Màu sắc**: Chỉnh sửa các biến `:root` trong `css/styles.css` (ví dụ: `--primary`, `--accent`).
*   **Sản phẩm**: Sửa đổi `loadSampleProducts()` trong `js/app.js` hoặc cập nhật cơ sở dữ liệu Firestore của bạn.

---
*Được tạo cho Dự án MindX JSI*
