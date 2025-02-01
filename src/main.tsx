import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Homepage from './home/Homepage.tsx';
import Top from './nav/Top.tsx';
import Register from './auth/Register.tsx';

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
    <Top />
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
