import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import MainLayout from "../layout/MainLayout";
import { Suspense } from "react";
import ProductSkeleton from "../components/ProductSkeleton";
import ErrorBoundary from "../components/ErrorBoundary";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Product = lazy(() => import("../pages/Product"));
const Users = lazy(() => import("../pages/Users"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: (
          <ErrorBoundary>
            <About />
          </ErrorBoundary>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<ProductSkeleton />}>
            <Product />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

export default router;