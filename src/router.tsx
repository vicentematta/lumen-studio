import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/RootLayout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/Services'
import ServiceDetail from '@/pages/ServiceDetail'
import Work from '@/pages/Work'
import WorkDetail from '@/pages/WorkDetail'
import Pricing from '@/pages/Pricing'
import Contact from '@/pages/Contact'
import Auth from '@/pages/Auth'
import NotFound from '@/pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'services/:slug', element: <ServiceDetail /> },
      { path: 'work', element: <Work /> },
      { path: 'work/:slug', element: <WorkDetail /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Auth mode="login" /> },
      { path: 'signup', element: <Auth mode="signup" /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
