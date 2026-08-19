import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout.jsx";
import About from "./pages/About.jsx";
import AllCourse from "./pages/AllCourse.jsx";
import Ai from "./pages/AI.jsx";
import Web from "./pages/Web.jsx";

const routes = createBrowserRouter([
  {
    path: "*",
    element: <h1>404 Page Not Found</h1>,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "course",
        element: <AllCourse />,
        children: [
          {
            path: "ai",
            element: <Ai />,
          },
          {
            path: "web",
            element: <Web />,
          },
        ],
      },
    ],
  },
]);

export default routes;
