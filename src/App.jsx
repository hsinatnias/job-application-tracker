import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/DashBoard'
import AddJob from './pages/AddJob'
import JobDetail from './pages/JobDetail'
import NotFound from './pages/NotFound'
import mockJobs from './data/mockJobs'
import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [jobs, setJobs] = useState(()=>{
    const stored = localStorage.getItem('jobs')
    return stored ? JSON.parse(stored) : mockJobs
  })
  useEffect(()=>{
    localStorage.setItem('jobs', JSON.stringify(jobs))
  }, [jobs])
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard jobs={jobs} setJobs={setJobs}/>}/>
           <Route path="add" element={<AddJob jobs={jobs} setJobs={setJobs}/>}/>
          <Route path="job/:id" element={<JobDetail jobs={jobs}/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
