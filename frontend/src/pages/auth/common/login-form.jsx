import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
  const submit = (e) => {
    const { name, value } = e.target;
    setUser({...user,[name]:value})
  }

  const LoginUser = async (e) => {
    e.preventDefault();
    
    const { email, password } = user;
    //console.log(email, password);
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      },{ withCredentials: true });
      if (res) {
        alert(res.data.message);
        setTimeout(() => {
          navigate("/client");
        }, 1500);
      } else {
        alert(res.data.error);
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
        register={register}
        error={errors.email}
        onChange={submit}
        className="h-[48px]"
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        register={register}
        error={errors.password}
        onChange={submit}
        className="h-[48px]"
      />
      <div className="flex justify-between">
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center" onClick={LoginUser}>Sign in</button>
    </form>
  );
};

export default LoginForm;
