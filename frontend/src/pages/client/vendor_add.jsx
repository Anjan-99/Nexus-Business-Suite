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

const vendoradd = () => {
  const navigate = useNavigate();

  const custadd = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const company_name = document.getElementById("company_name").value;
    const email = document.getElementById("email").value;
    const payable_amount = document.getElementById("payable_amount").value;
    const unused_credit = document.getElementById("unused_credit").value;
    try {
      const res = await axios.post(
        "http://localhost:5000/vendor_add",
        {
          name,
          company_name,
          email,
          payable_amount,
          unused_credit,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res) {
        alert(res.data.message);
        navigate("/vendortable");
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
                label="Name"
                placeholder="Ex: viral gautami, ... etc."
                id="name"
                isMask
              />
              <Textinput
                label="Company Name"
                placeholder="Ex: Titanslab, etc."
                id="company_name"
                isMask
              />
              <Textinput
                label="Email"
                placeholder="Ex: viral@gmail.com,... etc"
                id="email"
                isMask
              />
              <Textinput
                label="Payable Amount"
                placeholder="Ex: $5000,.. etc."
                id="payable_amount"
                isMask
              />
            </div>
            <Textinput
              label="Unused Credit"
              placeholder="$8000"
              id="unused_credit"
              isMask
            />
            <div className="ltr:text-left rtl:text-right">
              <button className="btn btn-primary text-center" onClick={custadd}>
                Submit
              </button>
            </div>
          </form>
        </div>
        <br />
      </Card>
    </div>
  );
};

export default vendoradd;
