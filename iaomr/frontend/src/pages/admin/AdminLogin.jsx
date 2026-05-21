import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {

    e.preventDefault();

    // SIMPLE PASSWORD

    if (password === "iaomradmin2026") {

      localStorage.setItem(
        "iaomr_admin",
        "true"
      );

      navigate("/admin/abstracts");

    } else {

      alert("Invalid Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        <form onSubmit={handleLogin}>

          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border rounded-xl px-4 py-3 mb-6"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}