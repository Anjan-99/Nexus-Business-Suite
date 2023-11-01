import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import InputGroup from "@/components/ui/InputGroup";
import Textarea from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

const paymentedit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const getdata = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/payment_find/${id}`,
        {
          method: "GET",
          withCredentials: true,
          header: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        },
        { withCredentials: true }
      );
      const user = res.data;
      console.log("user", user);
      setUser(user);
      document.getElementById("customer_name").value = user.customer_name;
      document.getElementById("invoice_number").value = user.invoice_number;
      document.getElementById("mode_of_payment").value = user.mode_of_payment;
      document.getElementById("amount").value = user.amount;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const paymentedit = async (e) => {
    e.preventDefault(); //form inputs
    const id = user._id;
    const date = user.date;
    const customer_name = document.getElementById("customer_name").value;
    const invoice_number = document.getElementById("invoice_number").value;
    const mode_of_payment = document.getElementById("mode_of_payment").value;
    const amount = document.getElementById("amount").value;

    
    try {
      const res = await axios.put(
        "http://localhost:5000/paymentupdate",
        {
          id,
          date,
          customer_name,
          invoice_number,
          mode_of_payment,
          amount,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res) {
        alert(res.data.message);
        navigate("/paymenttable");
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card title="Edit Payment">
        <div>
          <form className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
            <Textinput
                label="Customer Name"
                placeholder="Ex: John, Smith, etc."
                id="customer_name"
              />
              <Textinput
                label="Invoice Number"
                placeholder="Ex: 123456789"
                id="invoice_number"
              />
            
              <Textinput
                label="Mode of Payment"
                placeholder="Ex: Cash, Credit, etc."
                id="mode_of_payment"
              />
              <Textinput
                label="Amount"
                placeholder="Ex: 1000"
                id="amount"
              />
            </div>
            <div className="ltr:text-left rtl:text-right">
              <button
                className="btn btn-primary text-center"
                onClick={paymentedit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <br />
      </Card>
    </div>
  );
}

export default paymentedit;