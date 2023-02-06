import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userData"))
      setUser(JSON.parse(localStorage.getItem("userData")));
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <h2 className="mx-2">
        Welcome <span>{user && user.name} !</span>
      </h2>
      <Button
        className={user ? "d-none mx-2" : "mx-2"}
        type="primary"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
      {user && (
        <Button type="warning" onClick={() => handleLogout()}>
          Logout
        </Button>
      )}
    </div>
  );
}

export default Home;
