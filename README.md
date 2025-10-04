# 🛍️ Product Management Application

A full-stack demo using **NestJS + MikroORM + PostgreSQL + React + TailwindCSS**.

---

## 📘 Overview

This application allows:

- Admins: manage products (CRUD)
- Users: browse products, add to cart, checkout orders

---

## 🧱 Tech Stack

| Layer            | Technology                                  |
| ---------------- | ------------------------------------------- |
| Frontend         | React, TypeScript, TailwindCSS, React Query |
| Backend          | NestJS, MikroORM, JWT Auth                  |
| Database         | PostgreSQL (Docker)                         |
| ORM              | MikroORM                                    |
| State Management | Zustand                                     |
| API Docs         | Swagger (http://localhost:3000/docs)        |

---

## ⚙️ Setup

### 1️⃣ Start Database

docker compose up -d

### 2️⃣ Backend

cd server
cp .env.example .env
npm install
npm run mig:up
npm run seed
npm run start:dev

### 3️⃣ Frontend

cd web
cp .env.example .env
npm install
npm run dev
