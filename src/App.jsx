import React from "react";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Body from "./components/Body";
import About from "./pages/About";
import RegisterAuth from "./pages/auth/RegisterAuth";
import LoginAuth from "./pages/auth/LoginAuth";
import axios from "axios";
import Header from "./components/Header";
import InventoryPage from "./pages/InventoryPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Layout />
      </>
    ),
    children: [
      {
        path: "",
        element: <Body />,
      },
    ],
  },
  {
    path: "/users",
    element: <About />,
    loader: async () => {
      try {
        const res = await axios.get(
          "https://food-truck-api.onrender.com/api/v1/user/get-user",
          {
            withCredentials: true,
          }
        );
        const data = res.data;
        return data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    },
  },
  {
    path: "/inventory",
    element: <InventoryPage />,
  },
  {
    path: "/register",
    element: <RegisterAuth />,
  },
  {
    path: "/login",
    element: <LoginAuth />,
  },
]);
const App = () => {
  return <RouterProvider router={router}>App</RouterProvider>;
};

export default App;
