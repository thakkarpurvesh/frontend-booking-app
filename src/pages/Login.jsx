import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { loading, error } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(login({ email, password })).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				navigate("/booking");
			}
		});
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4">
				<h2 className="text-xl font-bold text-center">Login</h2>
				{error && <p className="text-red-500">{error}</p>}
				<input
					type="email"
					className="w-full border p-2 rounded"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					className="w-full border p-2 rounded"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button
					type="submit"
					disabled={loading}
					className="bg-blue-500 w-full py-2 text-white rounded hover:bg-blue-600"
				>
					{loading ? "Logging in..." : "Login"}
				</button>
				<p className="mt-4 text-sm text-center">
					Don’t have an account?{" "}
					<Link to="/" className="text-blue-500 hover:underline">
						Sign up here
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
