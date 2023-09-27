import { useRouteError } from "react-router-dom";
import { ReactNode } from "react";

type Error = {
  statusText: string | unknown;
  message: string | unknown;
};

export default function ErrorPage() {
  const { statusText, message } = useRouteError() as Error;

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{renderErrorMessage(statusText, message)}</i>
      </p>
    </div>
  );
}

function renderErrorMessage(
  statusText: string | unknown,
  message: string | unknown
): ReactNode {
  if (typeof statusText === "string" && typeof message === "string") {
    return statusText || message;
  } else {
    return "An error occurred.";
  }
}
