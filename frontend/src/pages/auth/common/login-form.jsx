import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";
import axios from "axios";
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();


const LoginForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const navigate = useNavigate();


  const [user , setUser] = useState({email:'',password:''})
  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setUser({...user,[name]:value})
  }

  const LoginUser = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log(res);
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert(res.data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="space-y-4 ">
      <Textinput
        name="email"
        label="email"
        type="email"
        error={errors.email}
        register={register}
        value={user.email}
        onChange={handleSubmit}
        className="h-[48px]"
        placeholder="Enter your email"
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        error={errors.password}
        register={register}
        value={user.password}
        onChange={handleSubmit}
        className="h-[48px]"
        placeholder="Enter your password"
      />
      <div className="flex justify-between">
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>

      <button
        className="btn btn-dark block w-full text-center"
        onClick={LoginUser}
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
