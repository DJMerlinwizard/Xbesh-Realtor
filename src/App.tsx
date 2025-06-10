import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Pricing from './pages/Pricing'
import LeadDetails from './pages/LeadDetails'
import Settings from './pages/Settings'
import Layout from './components/Layout'
import LeadsList from './pages/LeadsList'
import NotFound from './pages/NotFound'
import LandingPage from './pages/LandingPage'
import ProtectedRoute from './components/ProtectedRoute'
import Subscriptions from './pages/Subscriptions'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/pricing" element={<Pricing />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<LeadsList />} />
          <Route path="/leads/:id" element={<LeadDetails />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
        </Route>
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
