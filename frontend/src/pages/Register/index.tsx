import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {


const API_URL =
  import.meta.env.VITE_API_URL;


  const navigate =
    useNavigate();

  const [
    firstName,
    setFirstName,
  ] = useState("");

  const [
    lastName,
    setLastName,
  ] = useState("");

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const handleRegister = async () => {

  if (
    password !==
    confirmPassword
  ) {

    alert(
      "Passwords do not match"
    );

    return;
  }

  try {

    const response =
      await fetch(
          `${API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            first_name:
              firstName,
            last_name:
              lastName,
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
        data.detail ||
        "Registration Failed"
      );

      return;
    }

    alert(
      "Account Created Successfully"
    );

    navigate(
      "/login"
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
          Create Account
        </h1>

        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) =>
            setFirstName(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-3"
        />

        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) =>
            setLastName(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-3"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-3"
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
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Create Account
        </button>

        <div className="text-center mt-4">

          <Link
            to="/login"
            className="text-blue-600"
          >
            Back To Login
          </Link>

        </div>

      </div>

    </div>

  );
}