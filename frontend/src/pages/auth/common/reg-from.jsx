import React, { useState } from "react";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
//import { useDispatch, useSelector } from "react-redux";
//import { handleRegister } from "./store";
import axios from 'axios';

const schema = yup
  .object({
    name: yup.string().required("Name is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup
      .string()
      .min(6, "Password must be at least 8 characters")
      .max(20, "Password shouldn't be more than 20 characters")
      .required("Please enter password"),
    // confirm password
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

function RegForm () {
  //const dispatch = useDispatch();
  const [user , setUser] = useState({name:'',email:'',password:''})
  const {register,formState: { errors },} = useForm({resolver: yupResolver(schema),mode: "all",});

  const navigate = useNavigate();

  //use state 
  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setUser({...user,[name]:value})
  }

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, password } = user;
    try {
      const res = await axios.post("http://localhost:5000/register",{name,email,password})
      console.log(res)
      if(res.data.error){
        alert(res.data.error)
      }else{
        alert(res.data.message)
        navigate('/auth/login')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form className="space-y-5">
      <Textinput
        name="name"
        label="name"
        type="text"
        placeholder=" Enter your name"
        register={register}
        error={errors.name}
        className="h-[48px]"
        value = {user.name}
        onChange={handleSubmit}
      />{" "}
      <Textinput
        name="email"
        label="email"
        type="email"
        placeholder=" Enter your email"
        register={register}
        error={errors.email}
        className="h-[48px]"
        value = {user.email}
        onChange={handleSubmit}
      />
      <Textinput
        name="password"
        label="password"
        type="password"
        placeholder=" Enter your password"
        register={register}
        error={errors.password}
        className="h-[48px]"
        value = {user.password}
        onChange={handleSubmit}
      />
      <button className="btn btn-dark block w-full text-center" onClick={PostData}>
        Create an account
      </button>
    </form>
  );
};
export default RegForm ;
