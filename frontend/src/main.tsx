import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './app.css'
import { queryClient } from './lib/queryClient'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Attendance from './pages/Attendance'
import Payroll from './pages/Payroll'
import Navbar from './components/Navbar'

const router = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: '/employees', element: <Employees /> },
  { path: '/attendance', element: <Attendance /> },
  { path: '/payroll', element: <Payroll /> },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-200">
        <Navbar />
        <div className="max-w-6xl mx-auto p-6">
          <RouterProvider router={router} />
        </div>
      </div>
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)