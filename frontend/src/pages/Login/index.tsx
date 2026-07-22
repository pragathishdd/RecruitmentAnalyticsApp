import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {


const API_URL =
  import.meta.env.VITE_API_URL;


  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

 const handleLogin =
  async () => {

    try {

      const response =
        await fetch(
            `${API_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok
      ) {

        alert(
          "Invalid Email or Password"
        );

        return;
      }

      localStorage.setItem(
        "token",
        data.access_token
      );

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(
          data.user
        )
      );

      navigate(
        "/upload"
      );

    } catch {

      alert(
        "Unable to connect to server"
      );

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-2xl font-bold text-center mb-6">
          Recruitment Analytics
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Login
        </button>

        <div className="text-center mt-4">

          <Link
            to="/register"
            className="text-blue-600"
          >
            Create Account
          </Link>

        </div>

      </div>

    </div>

  );
}