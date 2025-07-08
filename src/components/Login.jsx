import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../store/authSlice";
import Input from "./Input";
import Logo from "./Logo";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const userLogin = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getUser();
        if (userData) dispatch(authLogin({userData}));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto max-w-4xl min-w-3xl h-auto rounded-xl p-10 border border-emerald-600 bg-slate-900/90">
        <div className="flex mb-2 justify-center">
          <Link to="/">
            <Logo Class="lg:w-50 md:w-50 sm:w-40 w-40 mt-1 mb-1" />
          </Link>
        </div>
        <h2 className="leading-tight text-white font-bold text-2xl text-center">
          Login to your account
        </h2>
        <p className="mt-2 text-center text-base text-white/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-600 duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="mt-8 text-center text-red-500">{error}</p>}
        <form className="mt-6" onSubmit={handleSubmit(userLogin)}>
          <div className="space-y-5">
            <Input
              label="Email: "
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: (value) =>
                  /^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    value
                  ) || "Enter a valid email address",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your Password"
              {...register("password", {
                required: true,
                validate: (value) =>
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ||
                  "Password must be at least 8 characters and include at least one letter and one number",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <button
              type="submit"
              className="rounded-full mt-4 px-4 py-1.5 text-xl text-white bg-cyan-700 outline-1 hover:outline-2 hover:bg-cyan-800"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
