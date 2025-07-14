import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/DashBoard'
import AddJob from './pages/AddJob'
import JobDetail from './pages/JobDetail'
import NotFound from './pages/NotFound'
import mockJobs from './data/mockJobs'
import './App.css'
import { useState } from 'react'

function App() {
  const [jobs, setJobs] = useState(mockJobs)
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard jobs={jobs}/>}/>
           <Route path="add" element={<AddJob jobs={jobs} setJobs={setJobs}/>}/>
          <Route path="job/:id" element={<JobDetail jobs={jobs}/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
