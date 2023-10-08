import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Navbar() {
  const { userToken, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary fixed-top">
      <div className="container">
        <NavLink className="navbar-brand fs-3" to="/">
          Notes App
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0 fw-semibold">
            {userToken === null ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="nav-link" onClick={logout}>
                  Logout <i className="fa-solid ms-2 fa-right-from-bracket"></i>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
