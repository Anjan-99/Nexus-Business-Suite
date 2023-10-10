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
const paymentadd = () => {

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
        customer_name,
        invoice_number,
        mode_of_payment,
        date,
        amount,
        unused_amount
      },{ withCredentials: true });
      console.log(res);
      if (res) {
        alert(res.data.message);
        setTimeout(() => {
          navigate("/payment_table"); //redirect to table
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
      <Card title="Add Payment Records"> 
        <div>
          <form className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
              <Textinput
                name = "customer_name"
                label="Customer Name"
                register={register}
                onChange={submit}
                isMask
                placeholder="Ex: 0001, 2222, etc."
              />
              <Textinput
                name = "invoice_number"
                label="Invoice Number"
                register={register}
                onChange={submit}
                isMask
                placeholder="Ex: anjan0001, etc."
              />
              <Textinput
                name = "mode_of_payment"
                label="Mode of Payment"
                register={register}
                onChange={submit}
                isMask
                placeholder="Ex: online,offline etc"
              />
              <Textinput
                name = "date"
                label="Date"
                register={register}
                onChange={submit}
                isMask
                placeholder="Ex: 27/09/2023 etc."
              />

              <Textinput
                name = "amount"
                label="Amount"
                register={register}
                onChange={submit}
                placeholder="$8000"
                isMask
              />
              <Textinput
                name = "unused_amount"
                label="Unused Amount"
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


export default paymentadd;



