import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ConvexProvider, ConvexReactClient } from "convex/react"
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Homepage from './home/Homepage.tsx';
import Top from './nav/Top.tsx';
import Register from './auth/Register.tsx';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/register',
    element: <Register />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <Top />
      <RouterProvider router={router}></RouterProvider>
    </ConvexProvider>
  </StrictMode>,
)
