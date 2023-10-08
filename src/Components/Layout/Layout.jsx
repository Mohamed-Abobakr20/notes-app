import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Offline } from "react-detect-offline";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mt-5 py-5">
        <div className="position-fixed rounded-2 bottom-0 start-0 shadow bg-primary text-white z-3 m-3">
          <Offline>
            <div className="p-3">
              <i className="fas fa-wifi me-2"></i>You Are Offline Now
            </div>
          </Offline>
        </div>
        <Outlet />
      </div>
    </>
  );
}
