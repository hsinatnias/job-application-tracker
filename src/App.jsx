import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/DashBoard'
import AddJob from './pages/AddJob'
import JobDetail from './pages/JobDetail'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard/>}/>
           <Route path="add" element={<AddJob/>}/>
          <Route path="job/:id" element={<JobDetail/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
