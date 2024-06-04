import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/pages/Home"
import ErrorBoundary from "../components/pages/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    // pathがマッチしない場合にerrorElement表示
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />
      },
    ]
  }
]);

export const Router = () => <RouterProvider router={router} />;
