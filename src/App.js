import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookingForm from "./pages/BookingForm";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
        <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <BookingForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
