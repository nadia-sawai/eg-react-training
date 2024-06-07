import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/pages/Home"
import Users from "../components/pages/Users"
import State from "../components/pages/State"
import ErrorBoundary from "../components/pages/ErrorBoundary";
import Layout from "../components/templates/Layout";


const router = createBrowserRouter([
  {
    path: "/",
    // elementに共通レイアウトを指定（下記の場合、Layoutコンポーネントの<Outlet />の箇所に、<Home />がレンダリングされる）
    element: <Layout />,
    // pathがマッチしない場合にerrorElement表示
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "users",
        element: <Users />
      },
      {
        path: "state",
        element: <State />
      },
    ]
  }
]);

export const Router = () => <RouterProvider router={router} />;
