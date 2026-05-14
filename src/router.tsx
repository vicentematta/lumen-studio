import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/RootLayout'
import Home from '@/legacy-pages/Home'
import About from '@/legacy-pages/About'
import Services from '@/legacy-pages/Services'
import ServiceDetail from '@/legacy-pages/ServiceDetail'
import Work from '@/legacy-pages/Work'
import WorkDetail from '@/legacy-pages/WorkDetail'
import Pricing from '@/legacy-pages/Pricing'
import Contact from '@/legacy-pages/Contact'
import NotFound from '@/legacy-pages/NotFound'

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
      { path: '*', element: <NotFound /> },
    ],
  },
])
