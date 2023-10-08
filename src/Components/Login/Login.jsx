import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUserToken } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is not valid")
        .required("Required field"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Minimum eight characters, at least one letter and one number:"
        )
        .required("Required field"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const { data } = await axios
        .post("https://note-sigma-black.vercel.app/api/v1/users/signIn", values)
        .catch((error) => {
          setError(error.response.data.msg);
          setLoading(false);
        });

      if (data.msg === "done") {
        localStorage.setItem("token", "3b8ny__" + data.token);
        setUserToken("3b8ny__" + data.token);
        navigate("/");
      }
    },
  });

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      {error ? (
        <div className="alert text-center alert-danger mb-3" role="alert">
          {error}
        </div>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="form-control"
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="alert alert-danger my-2" role="alert">
            {formik.errors.email}
          </div>
        ) : null}

        <label htmlFor="password" className="mt-2">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="form-control"
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password ? (
          <div className="alert alert-danger my-2" role="alert">
            {formik.errors.password}
          </div>
        ) : null}

        <div className="d-flex align-items-center justify-content-center mt-5">
          <button
            type="submit"
            className="btn btn-primary me-3 text-white"
            disabled={!(formik.isValid && formik.dirty)}>
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Login"
            )}
          </button>
          <NavLink to="/register" className="nav-link">
            Don't have an account? Register..
          </NavLink>
        </div>
      </form>
    </div>
  );
}
