# Real-Time Auction Platform – Frontend

This is the frontend application for a real-time auction and bidding platform built using React and Vite.  
It connects to a Node.js + Socket.io backend to provide real-time bidding, live countdown timers, and instant UI updates.

---

## Live Demo

Frontend:
https://auction-frontend-sigma-virid.vercel.app/

Backend:
https://auction-backend-1awd.onrender.com

---

## Features

- Real-time auction updates using Socket.io
- Server-synchronized countdown timers
- Visual feedback for winning and outbid states
- Price flash animation on bid updates
- Multi-user real-time bidding experience

---

## Technology Stack

- React
- Vite
- Socket.io Client

---

## Running Locally

```bash
npm install
npm run dev
Open in browser:
http://localhost:5173

Backend Configuration

The frontend is currently configured to use the deployed backend:

https://auction-backend-1awd.onrender.com


You can change this in the following files if needed:

src/api/items.api.js

src/socket/socket.js

Running Using Docker
docker build -t auction-frontend .
docker run -p 5173:5173 auction-frontend
Then open:
http://localhost:5173

Project Structure
src/
  api/         # API integration
  socket/      # Socket.io client setup
  components/  # UI components
  pages/       # Application pages
