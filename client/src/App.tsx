import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Signin from './components/views/Signin'
import Signup from './components/views/Signup'
import Home from './components/views/Home'
import Dashboard from './components/views/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
