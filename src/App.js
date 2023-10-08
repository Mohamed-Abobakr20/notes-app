import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import UserContextProvider from "./Context/UserContext";
import ProtectedAuth from "./Components/ProtectedAuth/ProtectedAuth";
import NoteContextProvider from "./Context/NoteContext";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedAuth>
            <Login />
          </ProtectedAuth>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedAuth>
            <Register />
          </ProtectedAuth>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <NoteContextProvider>
        <RouterProvider router={routes} />
      </NoteContextProvider>
    </UserContextProvider>
  );
}

export default App;
