import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/DashBoard";
import AddJob from "./pages/AddJob";
import JobDetail from "./pages/JobDetail";
import NotFound from "./pages/NotFound";
import mockJobs from "./data/mockJobs";
import "./App.css";
import { useState, useEffect } from "react";
import LogIn from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile.jsx";
import ResumeProfile from "./pages/ResumeProfile.jsx";
import ResumePreview from "./pages/ResumePreview.jsx";

function App() {
  const [jobs, setJobs] = useState(() => {
    const stored = localStorage.getItem("jobs");
    return stored ? JSON.parse(stored) : mockJobs;
  });
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard jobs={jobs} setJobs={setJobs} />} />
            <Route
              path="add"
              element={<AddJob jobs={jobs} setJobs={setJobs} />}
            />
            <Route path="job/:id" element={<JobDetail jobs={jobs} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="resume" element={<ResumeProfile />} />
            <Route path="resume_preview" element={<ResumePreview />} />
            <Route path="*" element={<NotFound />} />

          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
