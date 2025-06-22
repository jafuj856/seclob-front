import React, { useState } from "react";
import CommonInput from "../components/common/CommonInput";
import { Lock, Mail, User } from "lucide-react";
import { postData } from "../apis/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // Handle input change
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" }); // Clear error on change
  };

  // Simple validation
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    toast.clearWaitingQueue();
    if (!validate()) return;
    setisLoading(true);
    try {
      const res = await postData("/auth/signup", form);
      toast.success("registered successfully");
      // Optional: redirect or show success message
      localStorage.setItem("token", res?.data?.token);

      const stringData = JSON.stringify(res?.data);
      localStorage.setItem("user", stringData);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      console.error("Registration error:", err.response?.data);
      // Optional: show error toast or alert
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* Left side welcome section */}
      <div className="max-w-[47%] w-full relative hidden md:flex flex-col items-center justify-center h-screen">
        <div className="relative z-10 text-white flex flex-col items-center justify-center">
          <h1 className="font-[700] text-[40px] lg:text-[46px] md:block hidden">
            Welcome Back!
          </h1>
          <p className="text-center mt-[15px] lg:text-sm text-xs">
            To keep connected with us please
            <br /> login with your personal info
          </p>
          <button
            onClick={() => navigate("/login")}
            className="p-2 px-3 uppercase rounded-full border border-white mt-[40px]"
          >
            SIGN IN
          </button>
        </div>
        <img
          src="/bg.png"
          className="w-full h-full absolute top-0 left-0 bottom-0 z-0"
          alt=""
        />
      </div>

      {/* Right side registration form */}
      <div className="w-full flex items-center justify-center flex-col h-screen">
        <div className="relative z-10 flex flex-col items-center justify-center pt-10">
          <h1 className="font-[700] text-[30px] md:text-[40px] lg:text-[46px] text-buttonColor">
            Create Account
          </h1>

          <div className="mt-10 md:mt-5 flex flex-col gap-2 w-full max-w-[528px] capitalize">
            <CommonInput
              placeholder="Enter Your Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              icon={<User className="w-full max-[34px] h-full max-h-[34px]" />}
              err={errors.name}
            />
            <CommonInput
              placeholder="Enter Your Email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              icon={<Mail className="w-full max-[34px] h-full max-h-[34px]" />}
              err={errors.email}
            />
            <CommonInput
              placeholder="Enter Your Password"
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              icon={<Lock className="w-full max-[34px] h-full max-h-[34px]" />}
              err={errors.password}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="p-2 px-4 bg-buttonColor text-white rounded-full mt-7 font-[600] text-[21px] w-full max-w-[305px]"
          >
            {isLoading ? "Loading..." : " SIGN UP"}
          </button>
          <p
            onClick={() => navigate("/login")}
            className="md:hidden block text-center underline text-blue-500 cursor-pointer mt-2 text-sm"
          >
            Login
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
