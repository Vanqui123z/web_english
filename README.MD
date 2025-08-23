🟢 Phần 1 – Backend (NestJS)
1. Khởi tạo project NestJS
npm i -g @nestjs/cli
nest new backend

2. MongoDB & Mongoose

npm install @nestjs/mongoose mongoose bcrypt jsonwebtoken
npm install @types/jsonwebtoken --save-dev


React frontend (Vite + TS + Bootstrap)

npm create vite@latest frontend -- --template react-ts
cd frontend
npm install bootstrap react-router-dom

3. Cấu trúc thư mục
Tạo các module:

nest g module auth
nest g module users
nest g service users
nest g controller users
nest g service auth
nest g controller auth


