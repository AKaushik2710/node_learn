import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import './index.css'
import './App.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children : [
      {index : true, element : <Navigate to="/login" />},
      {path : 'login', element : <Login />},
      {path : 'dashboard', element : <Dashboard />},

    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
