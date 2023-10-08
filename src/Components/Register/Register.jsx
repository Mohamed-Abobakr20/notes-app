import React, { useState } from "react";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Minimum chars are 3")
        .max(20, "Maximum chars are 15")
        .required("Required field"),
      email: Yup.string()
        .email("Email is not valid")
        .required("Required field"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Minimum eight characters, at least one letter and one number:"
        )
        .required("Required field"),
      age: Yup.number()
        .required("Required field")
        .min(10, "Minimum age is 10")
        .max(70, "Maximum age is 70"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Your phone is not valid")
        .required("Required field"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const { data } = await axios
        .post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values)
        .catch((error) => {
          setError(error.response.data.msg);
          setLoading(false);
        });

      if (data.msg === "done") {
        navigate("/login");
      }
    },
  });

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      {error ? (
        <div className="alert text-center alert-danger mb-3" role="alert">
          {error}
        </div>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control"
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name ? (
          <div className="alert alert-danger my-2" role="alert">
            {formik.errors.name}
          </div>
        ) : null}

        <label htmlFor="email" className="mt-2">
          Email
        </label>
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

        <label htmlFor="age" className="mt-2">
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className="form-control"
          value={formik.values.age}
        />
        {formik.errors.age && formik.touched.age ? (
          <div className="alert alert-danger my-2" role="alert">
            {formik.errors.age}
          </div>
        ) : null}

        <label htmlFor="phone" className="mt-2">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.phone}
          className="form-control"
        />
        {formik.errors.phone && formik.touched.phone ? (
          <div className="alert alert-danger my-2" role="alert">
            {formik.errors.phone}
          </div>
        ) : null}

        <div className="d-flex align-items-center justify-content-center mt-5">
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn btn-primary me-3 text-white">
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
          <NavLink to="/login" className="nav-link">
            Have an account? login..
          </NavLink>
        </div>
      </form>
    </div>
  );
}
