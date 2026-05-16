import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/register",
        form
      );

      alert(res.data.message);

      navigate("/login");

    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-500"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Register;