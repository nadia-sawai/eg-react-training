# ルーティング

- [ ] URLによるコンポーネントの出し分けを学ぶ

## インストール
```$ npm install react-router-dom```

## ルーティング設定

### Step1 ページコンポーネント作成
```src/components/pages/``` に ```Home.tsx``` 追加  
```
const Home = () => {
  return (
    <div>Home</div>
  )
}

export default Home
```  

### Step2 ルーティングファイル作成
```src/router/index.tsx``` 追加
```
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/pages/Home"

// createBrowserRouter() でオブジェクトを作成
const router = createBrowserRouter([
  {
    path: "/",
    // error時の処理（これがないと怒られる）
    errorElement: <ErrorBoundary />,
    children: [
      {
        // indexはpathで指定した階層（今回の場合は/）
        index: true,
        element: <Home />
      },
    ]
  }
]);

// RouterProvider の routerに渡す
export const Router = () => <RouterProvider router={router} />;
```

### Step3 エラーコンポーネント追加
```src/components/pages/``` に ```Errorboundary.tsx``` 追加  
```
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();
  // errorがない場合はreturn nullを返す（returnだけだと呼び出し側で怒られる
  // isRouteErrorResponseはエラーがある場合はtrueになる
  if (!isRouteErrorResponse(error)) return null;

  return (
    <>
      {error.status === 404 && <div>404error</div>}
      {error.status === 401 && <div>401error</div>}
    </>
  );
};
export default ErrorBoundary;
```

### Step4 Routeコンポーネント設置
main.tsx で作成したrouterコンポーネントを呼び出す  
※ main.tsxに Step2 の内容を記述しても良いが極力コンポーネントを分けるため分離

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from "./router";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
```