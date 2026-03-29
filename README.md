# PLM Pro - Product Line Management

PLM Pro is a full-stack web application designed for robust product line and inventory management. Built with the MERN stack (MongoDB, Express, React, Node.js) and powered by Vite, it delivers a high-performance, intuitive user experience for managing products, monitoring inventory, and tracking customers.

## 🚀 Features

- **User Authentication**: Secure login and signup powered by JWT (JSON Web Tokens) and bcryptjs.
- **Dashboard Overview**: A dedicated dashboard providing a high-level view of system metrics.
- **Product Management**: Complete CRUD operations to manage your inventory seamlessly (Add, View, Update, Delete products).
- **Customer Directory**: Manage a customer database to track who is purchasing or interacting with your product lines.
- **Modern UI**: Clean, responsive frontend built with React, Lucide React icons, and React Router.

## 💻 Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Icons**: Lucide React & React Icons

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Security**: JSON Web Tokens (JWT), Bcrypt, CORS

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18 or later
- **MongoDB**: A local instance or a MongoDB Atlas connection URI
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd "Product Line Management"
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory with the following contents:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Setup the Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory with your backend API URL, for example:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend development server:**
   Open a new terminal window/tab:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application:**
   Open your browser and navigate to `http://localhost:5173`.

## 📁 Project Structure

```text
Product Line Management/
├── backend/                   # Express backend server
│   ├── models/                # Mongoose schema models (Product, User, etc.)
│   ├── routes/                # Express API routes (/api/products, /api/auth)
│   ├── server.js              # Entry point and express app configuration
│   └── package.json           # Node.js dependencies for backend
│
├── frontend/                  # Vite + React frontend application
│   ├── public/                # Static public assets
│   ├── src/
│   │   ├── components/        # Reusable view components (Navbar, etc.)
│   │   ├── pages/             # Application views (Overview, Login, Products)
│   │   ├── App.jsx            # Core application, auth state, and routing
│   │   └── main.jsx           # React app entry point
│   ├── vite.config.js         # Vite bundler configuration
│   └── package.json           # Frontend dependencies
│
└── .gitignore                 # Files/folders to be ignored by Git
```

## 📄 License
This project is licensed under the ISC License.
