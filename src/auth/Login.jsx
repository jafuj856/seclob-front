import React, { useState } from "react";
import CommonInput from "../components/common/CommonInput";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { postData } from "../apis/axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    toast.clearWaitingQueue();
    if (!validate()) return;
    setIsLoading(true);
    try {
      const res = await postData("/auth/login", form);
      toast.success("Login successful");
      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("user", JSON.stringify(res?.data));
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className="w-full flex items-center justify-center flex-col h-screen">
        <div className="relative z-10 flex flex-col items-center justify-center pt-10">
          <h1 className="font-[700] text-[30px] md:text-[40px] lg:text-[46px] text-buttonColor text-center">
            Sign In to <br /> Your Account
          </h1>
          <div className="mt-10 md:mt-5 flex flex-col gap-2 w-full max-w-[528px] capitalize">
            <CommonInput
              placeholder="Enter Your Email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              icon={<Mail className="w-full max-[34px] h-full max-h-[34px]" />}
              err={errors.email}
            />
            <CommonInput
              type="password"
              placeholder="Enter Your Password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              icon={<Lock className="w-full max-[34px] h-full max-h-[34px]" />}
              err={errors.password}
            />
            <p className="mt-4 font-[700] text-xs md:text-sm underline text-center cursor-pointer hover:text-blue-500">
              Forgot password?
            </p>
          </div>
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="p-2 px-4 bg-buttonColor text-white rounded-full mt-7 font-[600] text-[21px] w-full max-w-[305px]"
          >
            {isLoading ? "Loading..." : "SIGN IN"}
          </button>
          <p
            onClick={() => navigate("/register")}
            className="md:hidden block text-center underline text-blue-500 cursor-pointer mt-2 text-sm"
          >
            Register
          </p>
        </div>
      </div>
      <div className="max-w-[47%] w-full relative hidden md:flex flex-col items-center justify-center h-screen overflow-hidden">
        <div className="relative z-10 text-white flex flex-col items-center justify-center">
          <h1 className="font-[700] text-[40px] lg:text-[46px] md:block hidden">
            Welcome Back!
          </h1>
          <p className="text-center mt-[15px] lg:text-sm text-xs">
            To keep connected with us please
            <br /> login with your personal info
          </p>
          <button
            onClick={() => navigate("/register")}
            className="p-2 px-3 uppercase rounded-full border border-white mt-[40px]"
          >
            SIGN UP
          </button>
        </div>
        <img
          src="/bg.png"
          className="w-full h-full absolute top-0 left-10  bottom-0 z-0"
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;
