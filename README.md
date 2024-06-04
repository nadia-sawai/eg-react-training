# 共通レイアウト（共通テンプレート）

- [ ] HeaderやFooterなど共通レイアウトの実装を学ぶ

## Headerコンポーネント作成
```src/components/templates/``` に ```Header.tsx``` 追加  
```
const Header = () => {
  return (
    <div>Header</div>
  )
}

export default Header
```

## Footerコンポーネント作成
```src/components/templates/``` に ```Footer.tsx``` 追加  
```
const Footer = () => {
  return (
    <div>Footer</div>
  )
}

export default Footer
```

## Layoutコンポーネント作成
```src/components/templates/``` に ```Layout.tsx``` 追加  
LayoutコンポーネントでHeader, Footerコンポーネントを呼び出す  
※ Outlet を指定したコンポーネントをルーティングに設定しておくと、本来呼び出されるコンポーネントが```<Outlet />``` と置き換わる形でレンダリングされる
```
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout
```

## ルーティングにLayoutコンポーネントを指定
```src/router/index.tsx``` にLayoutコンポーネントを指定  
共通レイアウトを使用したい箇所にelementを指定
```
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/pages/Home"
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
    ]
  }
]);

export const Router = () => <RouterProvider router={router} />;
```