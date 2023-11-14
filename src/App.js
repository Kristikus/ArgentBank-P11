import "./App.css";
import Home from "./pages/Root";
import Root from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Root />,
      },
      {
        path: "user/signin",
        element: <SignIn />,
      },
      {
        path: "user/signup",
        element: <SignUp />,
      },
      {
        path: "user/profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
