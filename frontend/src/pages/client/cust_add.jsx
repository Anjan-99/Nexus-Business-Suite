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
const customeradd = () => {

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
    
    const { firstname, lastname,comapanyname, businessType, email, phone, address} = cust; //form inputs
    try {
      const res = await axios.post("http://localhost:5000/customer_add", {
        firstname,
        lastname,
        comapanyname,
        businessType,
        email,
        phone,
        address
      },{ withCredentials: true });
      console.log(res);
      if (res) {
        alert(res.data.message);
        setTimeout(() => {
          navigate("/customer_table"); //redirect to table
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
      <Card title="Add Customer"> 
        <div>
          <form className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
              <Textinput
                name = "firstname"
                label="First Name"
                register={register}
                onChange={submit}
                isMask
                placeholder="Ex: John, Smith, etc."
              />
              <Textinput
                name = "lastname"
                label="Last Name"
                register={register}
                onChange={submit}
                isMask
                placeholder="Ex: Patel, Shah, etc."
              />
              <Textinput
                name = "comapanyname"
                label="Company Name"
                register={register}
                onChange={submit}
                isMask
                placeholder="Ex: ABC Pvt Ltd"
              />
              <Textinput
                name = "businessType"
                label="Business Type"
                register={register}
                onChange={submit}
                isMask
                placeholder="Ex: Retailer, Wholesaler, etc."
              />

              <Textinput
                name = "email"
                label="Email"
                register={register}
                onChange={submit}
                id="date"
                placeholder="xyz@gmail.com"
                isMask
              />
              <InputGroup
                name = "phone"
                label="Phone Number"
                prepend="IN (+91)"
                placeholder="Phone Number"
                register={register}
                onChange={submit}
                id="phoneNumber"
                options={{ phone: true, phoneRegionCode: "US" }}
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


export default customeradd;



