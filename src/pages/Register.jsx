import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("User registered successfully")
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="max-w-sm mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create an Account</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleRegister}>
        <input
          type="email"
          className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
      <p className="text-sm text-center mt-4 text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600 hover:underline">Login</a>
      </p>
    </div>
  );
};
export default Register;
