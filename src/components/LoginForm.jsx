import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { myaxios } from "../axios/index";
import { Formik } from "formik";
import { loginValidationSchema } from "../utils/validationSchema";
import { useNavigate } from "react-router-dom";
function LoginForm() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    await myaxios.get("/sanctum/csrf-cookie").then(() => {
      myaxios
        .post("/api/v1/login", values)
        .then((res) => {
          if (res.status === 200)
            localStorage.setItem("userData", JSON.stringify(res.data.data));
          navigate("/");
        })
        .catch((err) => {
          setError(err);
        });
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column min-vh-100">
      <Button onClick={() => navigate(-1)} className="mb-3">
        Back to home
      </Button>
      {error && (
        <div className="m-2 alert alert-danger">
          <p className="text-danger">Wrong password or email</p>
        </div>
      )}
      <h2 className="mb-3">Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => handleLogin(values)}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          isValid,
        }) => (
          <Form className="w-25">
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                onBlur={handleBlur("password")}
                placeholder="Email"
                value={values.email}
                onChange={handleChange("email")}
                required
              />
              {errors.email && (
                <Form.Text className="text-danger ml-2">
                  {errors.email}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange("password")}
                required
              />
              {errors.password && (
                <Form.Text className="text-danger ml-2">
                  {errors.password}
                </Form.Text>
              )}
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={!isValid}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
