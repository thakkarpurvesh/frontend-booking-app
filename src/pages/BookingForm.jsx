import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, resetStatus } from "../redux/bookingSlice";
import Navbar from "../components/Navbar";

const BookingForm = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.booking);

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    bookingDate: "",
    bookingType: "Full Day",
    bookingSlot: "",
    fromTime: "",
    toTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBooking(form));
  };

  useEffect(() => {
    if (success) {
      alert("Booking created successfully!");
      dispatch(resetStatus());
      setForm({
        customerName: "",
        customerEmail: "",
        bookingDate: "",
        bookingType: "Full Day",
        bookingSlot: "",
        fromTime: "",
        toTime: "",
      });
    }
  }, [success, dispatch]);

  return (
    <>
    <Navbar />
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Booking</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="customerName"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="customerEmail"
          type="email"
          placeholder="Customer Email"
          value={form.customerEmail}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="bookingDate"
          type="date"
          value={form.bookingDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="bookingType"
          value={form.bookingType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Full Day">Full Day</option>
          <option value="Half Day">Half Day</option>
          <option value="Custom">Custom</option>
        </select>

        {/* Conditional: Half Day */}
        {form.bookingType === "Half Day" && (
          <select
            name="bookingSlot"
            value={form.bookingSlot}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Slot</option>
            <option value="First Half">First Half</option>
            <option value="Second Half">Second Half</option>
          </select>
        )}

        {/* Conditional: Custom */}
        {form.bookingType === "Custom" && (
          <div className="flex gap-4">
            <input
              name="fromTime"
              type="time"
              value={form.fromTime}
              onChange={handleChange}
              className="w-1/2 border p-2 rounded"
              required
            />
            <input
              name="toTime"
              type="time"
              value={form.toTime}
              onChange={handleChange}
              className="w-1/2 border p-2 rounded"
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 w-full py-2 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Create Booking"}
        </button>
      </form>
    </div>
    </>
  );
};

export default BookingForm;
