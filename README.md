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

<li> Add, update, and delete products </li>
<li> View current stock and product catalog </li>
<li> Automatic delisting when stock reaches zero </li>

### 🛍️ User

<li> Browse available products </li>
<li> Add to cart and adjust item quantities dynamically </li>
<li> View remaining stock in real time </li>
<li> Checkout to trigger automatic stock updates </li>

### 🔐 Authentication

<li> JWT-based login </li>
<li> Admin and User roles with distinct access rights </li>
<li> Admin access hides user navigation (Shop / Cart) </li>

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

<li> Auto-generated Swagger UI available at: <br>
👉 http://localhost:3000/docs </li>
<li> Displays all endpoints, DTOs, and authentication details for testing. </li>

### 2️⃣ Code Documentation

<li> Each service, controller, and entity contains JSDoc-style comments for maintainability. </li>
<li> Inline comments provided in key logic sections (e.g., checkout flow, authentication guard). </li>
<li> Folder structure: <br>
server/
├─ src/
│  ├─ auth/
│  ├─ products/
│  ├─ orders/
│  ├─ entities/
│  └─ ...
</li>

### 3️⃣ Testing

<li> Unit Testing: Uses Jest for controllers and services. </li>
<li> Run tests with: <br>
npm run test
</li>
<li> Integration Testing: Example test cases provided for /products endpoints. </li>

## 🗄️ Database Schema

### Entity Relationships

<li> User 1 — * Order </li>
<li> Order 1 — * OrderItem </li>
<li> Product 1 — * OrderItem </li>

### Tables

| Table           | Key Fields                            | Description                    |
| --------------- | ------------------------------------- | ------------------------------ |
| **users**       | id, email, password, role             | Stores admin and user accounts |
| **products**    | id, name, priceCents, stock, isActive | Product catalog                |
| **orders**      | id, userId, createdAt                 | Checkout records               |
| **order_items** | id, orderId, productId, quantity      | Line items in each order       |

## 🧭 ER Diagram

┌────────────┐ ┌────────────┐ ┌──────────────┐
│ users │ 1 _ │ orders │ 1 _ │ order_items │
│────────────│─────────│────────────│─────────│──────────────│
│ id │ │ id │ │ id │
│ email │ │ user_id FK │ │ order_id FK │
│ password │ │ createdAt │ │ product_id FK│
│ role │ └────────────┘ │ quantity │
└────────────┘ └──────────────┘
↑
│ \*  
 │
│
┌────────────┐
│ products │
│────────────│
│ id │
│ name │
│ priceCents │
│ stock │
│ isActive │
└────────────┘

## 🧠 Notes

<ul>
<li> Ensure Docker is running before starting the backend. </li>
<li> Default ports: <br>
<ul>
    <li> Backend → http://localhost:3000 </li>
    <li> Frontend → http://localhost:5173 </li>
</ul>
</li>
<li> Update .env files in both server and web folders if ports or DB configs differ. </li>
</ul>

## 🧑‍💻 Developer Info

Built with ❤️ using:

<li> TypeScript </li>
<li> NestJS CLI </li>
<li> React + Vite </li>
<li> TailwindCSS </li>
<li> PostgreSQL </li>
<li> MikroORM </li>
