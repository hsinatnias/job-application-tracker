import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-hot-toast'

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      setError("This email is already registered. Try logging in.");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 flex-col justify-between p-12">
        <div>
          <h1 className="text-white text-2xl font-bold">🧭 Job Tracker</h1>
          <p className="text-indigo-200 text-sm mt-1">Your career journey, organized.</p>
        </div>
        <div>
          <h2 className="text-white text-4xl font-bold leading-tight mb-4">
            Start your<br />job search<br />the smart<br />way.
          </h2>
          <p className="text-indigo-200 text-sm leading-relaxed max-w-sm">
            Create your free account and start tracking every application,
            interview, and offer — all in one beautiful dashboard.
          </p>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="text-white text-2xl font-bold">Free</p>
            <p className="text-indigo-200 text-xs">Always</p>
          </div>
          <div>
            <p className="text-white text-2xl font-bold">PDF</p>
            <p className="text-indigo-200 text-xs">Resume export</p>
          </div>
          <div>
            <p className="text-white text-2xl font-bold">∞</p>
            <p className="text-indigo-200 text-xs">Applications</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-2xl font-bold text-indigo-600">🧭 Job Tracker</h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Create account</h2>
          <p className="text-sm text-gray-500 mb-8">Start tracking your job applications today</p>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                required
                className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat your password"
                required
                className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition mt-2"
            >
              Create account
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Register;