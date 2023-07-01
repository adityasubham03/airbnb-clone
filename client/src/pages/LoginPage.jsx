import { AxiosError } from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function Login(ev) {
		console.log("f");
		ev.preventDefault();
		try {
			const res = await axios.post('/api/auth/login', { email, password });
			if (res.status === 200) {
				alert("Login Successful.");
			}
		} catch (err) {
			if (err instanceof AxiosError) {
				alert(err.response.status+"!! "+err.response.data.message);
			}
		}
	}

	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="mb-64">
				<h1 className="text-4xl text-center mb-4">Login</h1>
				<form className="max-w-md mx-auto" onSubmit={Login}>
					<input
						type="email"
						placeholder="your@email.com"
						value={email}
						onChange={(ev) => setEmail(ev.target.value)}
					/>
					<input
						type="password"
						placeholder="password"
						value={password}
						onChange={(ev) => setPassword(ev.target.value)}
					/>
					<button className="primary">Login</button>
					<div className="text-center py-2 text-gray-500">
						Don't have an account yet?{" "}
						<Link className="underline text-black" to={"/register"}>
							Register Now
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
