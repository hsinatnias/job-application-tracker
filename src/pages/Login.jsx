import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError("");
    } catch (err) {
      setError(err.message);
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
            Track every<br />opportunity.<br />Land your dream<br />job.
          </h2>
          <p className="text-indigo-200 text-sm leading-relaxed max-w-sm">
            Manage all your job applications in one place — track status,
            add notes, generate your resume, and never miss a follow-up.
          </p>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="text-white text-2xl font-bold">5+</p>
            <p className="text-indigo-200 text-xs">Status stages</p>
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

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-8">Sign in to your account</p>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {resetSent && (
            <div className="mb-4 px-4 py-3 bg-green-50 border border-green-100 rounded-lg">
              <p className="text-sm text-green-600">Password reset email sent! Check your inbox.</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition mt-2"
            >
              Sign in
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 font-medium hover:underline">
              Create one
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;