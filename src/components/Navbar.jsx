import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Booking System</h1>
      <div className="flex items-center gap-4">
        <Link
          to="/booking"
          className="hover:underline transition duration-200 text-white"
        >
          Booking
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
