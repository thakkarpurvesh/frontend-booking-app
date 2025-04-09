import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/authSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const { loading, error } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(signup(form)).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				navigate("/login");
			}
		});
	};

	return (
		<>
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4">
				<h2 className="text-xl font-bold text-center">Signup</h2>
				{error && <p className="text-red-500">{error}</p>}
				<input
					name="firstName"
					placeholder="First Name"
					value={form.firstName}
					onChange={handleChange}
					className="w-full border p-2 rounded"
					required
				/>
				<input
					name="lastName"
					placeholder="Last Name"
					value={form.lastName}
					onChange={handleChange}
					className="w-full border p-2 rounded"
					required
				/>
				<input
					name="email"
					type="email"
					placeholder="Email"
					value={form.email}
					onChange={handleChange}
					className="w-full border p-2 rounded"
					required
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					value={form.password}
					onChange={handleChange}
					className="w-full border p-2 rounded"
					required
				/>
				<button
					type="submit"
					disabled={loading}
					className="bg-green-500 w-full py-2 text-white rounded hover:bg-green-600"
				>
					{loading ? "Signing up..." : "Sign Up"}
				</button>
			<p className="mt-4 text-sm text-center">
				Already have an account?{" "}
				<Link to="/login" className="text-blue-500 hover:underline">
					Login here
				</Link>
			</p>
			</form>
		</div>
			</>
	);
};

export default Signup;
