import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login to your Account</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
      <p className="text-sm text-center mt-4 text-gray-600">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-600 hover:underline">Register</a>
      </p>
    </div>
  );
}
export default Login
