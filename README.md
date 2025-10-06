# 🛍️ Product Management Application

A full-stack demo built with **NestJS + MikroORM + PostgreSQL + React + TailwindCSS**.

---

## 📘 Overview

This application allows:

- 👨‍💼 **Admins:** manage products (Create, Read, Update, Delete)
- 🛒 **Users:** browse products, add to cart, and checkout orders

---

## 🧱 Tech Stack

| Layer                | Technology                                  |
| -------------------- | ------------------------------------------- |
| **Frontend**         | React, TypeScript, TailwindCSS, React Query |
| **Backend**          | NestJS, MikroORM, JWT Authentication        |
| **Database**         | PostgreSQL (via Docker)                     |
| **ORM**              | MikroORM                                    |
| **State Management** | Zustand                                     |
| **API Docs**         | Swagger (http://localhost:3000/docs)        |

---

## ⚙️ Setup Guide

### 🐋 1. Start Database

docker compose up -d <br>

### 🖥️ 2. Backend Setup

cd server <br>
cp .env.example .env <br>
npm install <br>
npm run mig:up <br>
npm run seed <br>
npm run start:dev <br>

### 💻 3. Frontend Setup

cd web <br>
cp .env.example .env <br>
npm install <br>
npm run dev <br>

## 🚀 Features

### 🧩 Admin

- Add, update, and delete products
- View current stock and product catalog
- Automatic delisting when stock reaches zero

### 🛍️ User

- Browse available products
- Add to cart and adjust item quantities dynamically
- View remaining stock in real time
- Checkout to trigger automatic stock updates

### 🔐 Authentication

- JWT-based login
- Admin and User roles with distinct access rights
- Admin access hides user navigation (Shop / Cart)

## 🧾 API Endpoints (Highlights)

| Method   | Endpoint           | Description                    |
| -------- | ------------------ | ------------------------------ |
| `POST`   | `/auth/login`      | User/Admin login               |
| `GET`    | `/products`        | Get all available products     |
| `POST`   | `/products`        | Add a new product (Admin only) |
| `PATCH`  | `/products/:id`    | Update a product (Admin only)  |
| `DELETE` | `/products/:id`    | Remove a product (Admin only)  |
| `POST`   | `/orders/checkout` | Checkout cart and update stock |

## 📄 Documentation

### 1️⃣ API Documentation

- Auto-generated Swagger UI available at: <br>
👉 http://localhost:3000/docs
- Displays all endpoints, DTOs, and authentication details for testing.

### 2️⃣ Code Documentation

- Each service, controller, and entity contains JSDoc-style comments for maintainability.
- Inline comments provided in key logic sections (e.g., checkout flow, authentication guard).
- Folder structure: <br>
server/
├─ src/
│  ├─ auth/
│  ├─ products/
│  ├─ orders/
│  ├─ entities/
│  └─ ...

### 3️⃣ Testing

- Unit Testing: Uses Jest for controllers and services.
- Run tests with: <br>
npm run test
- Integration Testing: Example test cases provided for /products endpoints.

## 🗄️ Database Schema

### Entity Relationships

- User 1 — * Order
- Order 1 — * OrderItem
- Product 1 — * OrderItem

### Tables

| Table           | Key Fields                            | Description                    |
| --------------- | ------------------------------------- | ------------------------------ |
| **users**       | id, email, password, role             | Stores admin and user accounts |
| **products**    | id, name, priceCents, stock, isActive | Product catalog                |
| **orders**      | id, userId, createdAt                 | Checkout records               |
| **order_items** | id, orderId, productId, quantity      | Line items in each order       |

## 🧠 Notes

- Ensure Docker is running before starting the backend.
- Default ports: <br>
    - Backend → http://localhost:3000
    - Frontend → http://localhost:5173
- Update .env files in both server and web folders if ports or DB configs differ.

## 🧑‍💻 Developer Info

Built with ❤️ using:

- TypeScript
- NestJS CLI
- React + Vite
- TailwindCSS
- PostgreSQL
- MikroORM
