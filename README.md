# Meeting Room Booking System

A full-stack web application for managing bookings for a single meeting room with role-based access control.

## Live Demo

---

# Features

## Authentication / Role Selection

* Login or select users by role
* Roles:

  * Admin
  * Owner
  * User

## Booking Management

* Create meeting room bookings
* View all bookings
* Delete bookings based on permissions
* Prevent overlapping bookings
* Allow back-to-back bookings

## Admin Features

* Create users
* Delete users
* Change user roles
* View all users

## Owner Features

* Delete any booking
* View bookings grouped by user
* View booking usage summary

---

# Booking Rules

* `startTime` must be before `endTime`
* Bookings cannot overlap
* Back-to-back bookings are allowed
* All times are handled consistently using ISO datetime format

Overlap validation logic:

```js
if (newStart < existingEnd && newEnd > existingStart) {
  // overlap detected
}
```

---

# Tech Stack

## Frontend

* React.js
* Axios
* CSS / TailwindCSS

## Backend

* Node.js
* Express.js

## Database

* MySQL / SQLite

---

# API Endpoints

## Users

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| GET    | /users          | Get all users    |
| POST   | /users          | Create user      |
| PATCH  | /users/:id/role | Update user role |
| DELETE | /users/:id      | Delete user      |

## Bookings

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| GET    | /bookings     | Get all bookings |
| POST   | /bookings     | Create booking   |
| DELETE | /bookings/:id | Delete booking   |

## Summary

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| GET    | /bookings/summary | Booking statistics |

---

# Project Structure

```bash
client/
  src/
    components/
    pages/
    services/

server/
  routes/
  controllers/
  middleware/
  models/
  database/
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/meeting-room-booking-system.git
```

---

## Backend Setup

```bash
cd server
npm install
npm run dev
```

Create `.env`

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=meeting_room_booking
```

---

## Frontend Setup

```bash
cd client
npm install
npm start
```

---

# Permission Rules

## User

Can:

* Create booking
* View bookings
* Delete own bookings

Cannot:

* Delete others’ bookings
* Manage users

## Owner

Can:

* Delete any booking
* View summaries

## Admin

Can:

* Manage users
* Manage roles
* Delete any booking

---

# User Deletion Behavior

When a user is deleted:

* All bookings created by that user are also deleted (cascade delete behavior)

---

# Future Improvements

* JWT Authentication
* Calendar view
* Email notifications
* Booking filters
* Unit testing

---

# Author

Developed by Your Name
