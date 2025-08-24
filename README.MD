## khởi tạo  
🟢 Phần 1 – Backend (NestJS)
1. Khởi tạo project NestJS
npm i -g @nestjs/cli
nest new backend

2. MongoDB & Mongoose

npm install @nestjs/mongoose mongoose bcrypt jsonwebtoken
npm install @types/jsonwebtoken --save-dev

🟢 Phần 2 – Frontend (React)
React frontend (Vite + TS + Bootstrap)

npm create vite@latest frontend -- --template react-ts
cd frontend
npm install bootstrap react-router-dom

## Tổng quát chức năng :

🧑‍🎓 Học viên (Student)
Đăng ký & đăng nhập tài khoản (JWT Auth).
Quản lý session (token lưu localStorage).
Xem danh sách giáo viên (tên, kinh nghiệm, giá, bio, video giới thiệu).
Xem chi tiết profile giáo viên (/tutor/:id).
Đặt lịch học thử (chọn ngày/giờ).
Quản lý danh sách lịch học thử của mình (My Bookings).
Nhận điểm thưởng (loyalty) sau khi thanh toán (mock).

👩‍🏫 Giáo viên (Tutor)
Đăng ký tài khoản với role Tutor.
Tạo & cập nhật hồ sơ cá nhân (bio, kinh nghiệm, giá, video giới thiệu, lịch trống).
Nhận thông báo khi có học viên đặt lịch học thử.
Quản lý danh sách học viên đã đặt lịch (My Students).

🛠 Quản trị viên (Admin)
Quản lý user (danh sách học viên, tutor).
Xóa / block user khi cần.
Quản lý hồ sơ tutor (CRUD).
Quản lý cơ bản hệ thống.

💳 Thanh toán (Mock Payment)

Giả lập luồng thanh toán thành công.
Sau thanh toán, cộng điểm thưởng (loyalty) cho học viên.
Cho phép demo hệ thống tích điểm đổi thưởng sau này.


## flow:
     Người học vào landing page → bấm “Đăng ký học thử”.
     Tạo tài khoản học viên → đăng nhập.
    Xem danh sách tutor → chọn tutor → xem profile.
    Đặt lịch học thử.
    Tutor nhận thông báo về booking mới.
    Admin có thể quản lý user/tutor.
    (Optional) Học viên thực hiện thanh toán (mock) → được cộng điểm thưởng.



##  Các cải tiến :
🔐 1. Tăng cường bảo mật :
Xác thực & phân quyền
Dùng JWT để xác thực người dùng.
Áp dụng Role-based Access Control (RBAC): admin, student tutor.
Hash password bằng bcrypt hoặc argon2.
Bảo mật API, router
Giới hạn request bằng rate-limiter để tránh brute-force.
Sử dụng Environment variables (dotenv) để giấu DB_URI, JWT_SECRET.

⚡ 2. Tối ưu hiệu suất
Dùng lean() khi query với Mongoose để giảm overhead.
Phân trang dữ liệu (pagination) thay vì trả về tất cả.
Dùng Compression middleware để nén response.
Sử dụng lazy loading cho ảnh và component.

🌐 3. Tối ưu SEO (vì react là single-Page nên việc tối ưu khá khó)

Thêm robots.txt và sitemap.xml.
Viết nội dung có từ khóa chính (ví dụ: "TOEIC online test").







