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
