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

const expensesedit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const getdata = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/expenses_find/${id}`,
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
      setUser(user);
      document.getElementById("expenses").value = user.expenses;
      document.getElementById("vendor_name").value = user.vendor_name;
      document.getElementById("mode_of_payment").value = user.mode_of_payment;
      document.getElementById("customer_name").value = user.customer_name;
      document.getElementById("item").value = user.item;
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const expensesedit = async (e) => {
    e.preventDefault(); //form inputs
    const id = user._id;
    const date = user.date;
    const expenses = document.getElementById("expenses").value;
    const vendor_name = document.getElementById("vendor_name").value;
    const mode_of_payment = document.getElementById("mode_of_payment").value;
    const customer_name = document.getElementById("customer_name").value;
    const item = document.getElementById("item").value;
    try {
      const res = await axios.put(
        "http://localhost:5000/expensesupdate",
        {
          id,
          expenses,
          vendor_name,
          mode_of_payment,
          customer_name,
          item,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res) {
        alert(res.data.message);
        navigate("/expensestable");
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card title="Edit Expenses">
        <div>
          <form className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
            <Textinput
                label="Expenses"
                placeholder="Ex: John, Smith, etc."
                id="expenses"
              />
              <Textinput
                label="Vendor Name"
                placeholder="Ex: John, Smith, etc."
                id="vendor_name"
              />
              <Textinput
                label="Mode of Payment"
                placeholder="Ex: John, Smith, etc."
                id="mode_of_payment"
              />
              <Textinput
                label="Customer Name"
                placeholder="Ex: John, Smith, etc."
                id="customer_name"
              />
              <Textinput
                label="Item"
                placeholder="Ex: John, Smith, etc."
                id="item"
              />
            </div>
            <div className="ltr:text-left rtl:text-right">
              <button
                className="btn btn-primary text-center"
                onClick={expensesedit}
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

export default expensesedit;