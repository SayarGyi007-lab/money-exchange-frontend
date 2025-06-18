# 💱 Money Exchange Web Application

## Built with React + Vite | Express + Node.js | MongoDB

This project is a full-stack money exchange platform designed to streamline currency conversion and user payment processing. The system consists of a React + Vite frontend, a Node.js + Express backend, and MongoDB for persistent data storage.

🌐 Key Features
👥 User Interface
View live buy and sell exchange rates for various currencies.

Input desired amount to exchange.

Select payment methods dynamically based on the selected "from" currency.

Upload a payment slip after transferring money to confirm transactions.

Fully connected to backend services via RESTful APIs.

🔐 Admin Panel
Accessible at a dedicated route: /admin (No password required yet).

Perform full CRUD operations:

Add/edit/delete currency rates.

Add/edit/delete currencies and payment methods.

View uploaded payment slips along with associated user information.

Enables complete control over system configuration and user transactions.

🧰 Tech Stack
Layer	Technologies
Frontend	React, Vite, Tailwind CSS (optional styling)
Backend	Node.js, Express.js
Database	MongoDB (via Mongoose)
Hosting	Vercel (Frontend), Render (Backend)

🚀 Live Demo
Frontend (User Interface): money-exchange-frontend.vercel.app

Admin Panel: money-exchange-frontend.vercel.app/admin

Backend API Server: currency-rate-cwtr.onrender.com

⚠️ Notes
The current version is not fully responsive and may not display optimally on mobile devices.

Authentication is not implemented yet — Admin panel is publicly accessible.

This is an MVP (Minimum Viable Product) version and planned features like responsive layout, authentication, and user dashboards can be added in future updates.
