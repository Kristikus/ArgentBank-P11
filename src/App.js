import './App.min.css'
import Home from './pages/Home'
import Root from './pages/Root'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'user/signin',
        element: <SignIn />,
      },
      {
        path: 'user/signup',
        element: <SignUp />,
      },
      {
        path: 'user/profile',
        element: <Profile />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
