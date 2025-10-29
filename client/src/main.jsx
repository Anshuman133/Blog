import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from './RootLayout/RootLayout.jsx'
import { About } from './pages/About.jsx'
import { Projects } from './pages/Projects.jsx'
import { Newsletter } from './pages/Newsletter.jsx'
import { Admin } from './pages/Admin.jsx'
import { BlogDetails } from './pages/BlogDetails.jsx'

const router  = createBrowserRouter([
  {
    path: '/', element: <RootLayout/>, children: [
      {index: true, element: <App/>},
      {path: 'about', element: <About/>},
      {path: 'projects', element: <Projects/>},
      {path: 'newsletter', element: <Newsletter/>},
      {path: 'blog/:blogId', element: <BlogDetails/>}

    ]
  },
  {path: 'me/admin', element: <Admin/>},

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
