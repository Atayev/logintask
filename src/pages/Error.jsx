import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/"), 2000);
  });
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <h1 className="text-danger">
        Error 404 :Page does not exist redirecting...
      </h1>
    </div>
  );
}

export default ErrorPage;
