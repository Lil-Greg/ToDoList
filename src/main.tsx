import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ConvexProvider, ConvexReactClient } from "convex/react"
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Homepage from './home/Homepage.tsx';
import Top from './nav/Top.tsx';
import Register from './auth/Register.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserContextProvider } from './context/UserContext.tsx';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <Top />
        </UserContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </ConvexProvider>
  </StrictMode>,
)
