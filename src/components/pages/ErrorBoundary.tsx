import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();
  // {
  //    status: 404
  //    statusText: "Not Found"
  //    internal: true
  //    data: "Error: No route matches URL "/ss""
  //    error:
  //    Error: No route matches URL "/ss"
  // }

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
