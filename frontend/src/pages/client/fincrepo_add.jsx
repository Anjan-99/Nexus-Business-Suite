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
const fincrepoadd = () => {

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
    
    const { report_type, data} = cust; //form inputs
    try {
      const res = await axios.post("http://localhost:5000/customer_add", {
        report_type,
        data,
      },{ withCredentials: true });
      console.log(res);
      if (res) {
        alert(res.data.message);
        setTimeout(() => {
          navigate("/invoice_table"); //redirect to table
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
      <Card title="Add Financial Report"> 
        <div>
          <form className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
              <Textinput
                name = "report_type"
                label="Report Type"
                register={register}
                onChange={submit}
                isMask
                placeholder="Ex:  research reports, analytical reports etc."
              />
              <Textinput
                name = "data"
                label="Data"
                register={register}
                onChange={submit}
                isMask
                placeholder="Ex: customer demographics,performance forecasting etc."
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


export default fincrepoadd;