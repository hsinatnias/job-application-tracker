import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/DashBoard";
import AddJob from "./pages/AddJob";
import JobDetail from "./pages/JobDetail";
import NotFound from "./pages/NotFound";
import "./App.css";
import { useState, useEffect } from "react";
import LogIn from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile.jsx";
import ResumeProfile from "./pages/ResumeProfile.jsx";
import ResumePreview from "./pages/ResumePreview.jsx";
import { useAuth } from "./contexts/AuthContext";
import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

function AppContent() {
  const { user, loading } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "jobs"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobsData);
    });

    return () => unsubscribe();
  }, [user]);

  const addJob = async (jobData) => {
    if (!user) return;
    await addDoc(collection(db, "users", user.uid, "jobs"), {
      ...jobData,
      createdAt: new Date().toISOString(),
    });
  };

  const updateJob = async (id, jobData) => {
    if (!user) return;
    await updateDoc(doc(db, "users", user.uid, "jobs", id), jobData);
  };

  const deleteJob = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "jobs", id));
  };

  if (loading) return null;

  return (
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
          <Route index element={<Dashboard jobs={jobs} addJob={addJob} updateJob={updateJob} deleteJob={deleteJob} />} />
          <Route path="add" element={<AddJob jobs={jobs} addJob={addJob} updateJob={updateJob} />} />
          <Route path="job/:id" element={<JobDetail jobs={jobs} />} />
          <Route path="profile" element={<Profile />} />
          <Route path="resume" element={<ResumeProfile />} />
          <Route path="resume_preview" element={<ResumePreview />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </Router>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;