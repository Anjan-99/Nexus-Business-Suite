import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import InputGroup from "@/components/ui/InputGroup";
import Textarea from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustAdd from "./react-tables/CustAdd";
import axios from "axios";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const vendoradd = () => {

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const navigate = useNavigate();

  const [cust , setUser] = useState()
  const submit = (e) => {
    const { name, value } = e.target;
    setUser({...cust,[name]:value})
  }

  const custadd = async (e) => {
    e.preventDefault();
    
    const { customer_name, invoice_number, mode_of_payment, date, amount, unused_amount} = cust; //form inputs
    try {
      const res = await axios.post("http://localhost:5000/customer_add", {
        name,
        company_name,
        email,
        payable_amount,
        unused_credit
      },{ withCredentials: true });
      console.log(res);
      if (res) {
        alert(res.data.message);
        setTimeout(() => {
          navigate("/vendor_table"); //redirect to table
        }, 1500);
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card title="Add Vendor"> 
        <div>
          <form className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
              <Textinput
                name = "name"
                label="Name"
                register={register}
                onChange={submit}
                isMask
                placeholder="Ex: viral gautami, ... etc."
              />
              <Textinput
                name = "company_name"
                label="Company Name"
                register={register}
                onChange={submit}
                isMask
                placeholder="Ex: Titanslab, etc."
              />
              <Textinput
                name = "email"
                label="Email"
                register={register}
                onChange={submit}
                isMask
                placeholder="Ex: viral@gmail.com,... etc"
              />
              <Textinput
                name = "payable_amount"
                label="Payable Amount"
                register={register}
                onChange={submit}
                isMask
                placeholder="Ex: $5000,.. etc."
              />

              <Textinput
                name = "unused_credit"
                label="Unused Credit"
                register={register}
                onChange={submit}
                placeholder="$8000"
                isMask
              />
            </div>
            <div className="grid xl:grid-cols-1 grid-cols-1 gap-5">
              <Textarea label="Address" id="pn4" name="address" placeholder="Address" register={register}
                onChange={submit} />
            </div>
            <div className="ltr:text-left rtl:text-right">
              <button className="btn btn-primary text-center" onClick={custadd}>Submit</button>
            </div>
          </form>
        </div>
        <br />
      </Card>
    </div>
  );
  
};


export default vendoradd;



