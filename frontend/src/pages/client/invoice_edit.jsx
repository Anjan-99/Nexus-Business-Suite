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

const invoiceedit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const getdata = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/invoice_find/${id}`,
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
      document.getElementById("cust_name").value = user.cust_name;
      document.getElementById("issue_date").value = user.issue_date;
      document.getElementById("cust_phone").value = user.cust_phone;
      document.getElementById("cust_email").value = user.cust_email;
      document.getElementById("cust_address").value = user.cust_address;
      document.getElementById("res_name").value = user.res_name;
      document.getElementById("res_phone").value = user.res_phone;
      document.getElementById("res_email").value = user.res_email;
      document.getElementById("res_address").value = user.res_address;
      document.getElementById("additional_info").value = user.additional_info;
      document.getElementById("total_amount").value = user.total_amount;
      document.getElementById("item_name").value = user.item_name;
      document.getElementById("item_quantity").value = user.item_quantity;
      document.getElementById("status").value = user.status;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const invoiceedit = async (e) => {
    e.preventDefault(); //form inputs
    const id = user._id;
    const cust_name = document.getElementById("cust_name").value;
    const issue_date = document.getElementById("issue_date").value;
    const cust_phone = document.getElementById("cust_phone").value;
    const cust_email = document.getElementById("cust_email").value;
    const cust_address = document.getElementById("cust_address").value;
    const res_name = document.getElementById("res_name").value;
    const res_phone = document.getElementById("res_phone").value;
    const res_email = document.getElementById("res_email").value;
    const res_address = document.getElementById("res_address").value;
    const additional_info = document.getElementById("additional_info").value;
    const total_amount = document.getElementById("total_amount").value;
    const item_name = document.getElementById("item_name").value;
    const item_quantity = document.getElementById("item_quantity").value;
    const status = document.getElementById("status").value;
    try {
      const res = await axios.put(
        "http://localhost:5000/invoiceupdate",
        {
          id,
          cust_name,
          issue_date,
          cust_phone,
          cust_email,
          cust_address,
          res_name,
          res_phone,
          res_email,
          res_address,
          additional_info,
          total_amount,
          item_name,
          item_quantity,
          status,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res) {
        alert(res.data.message);
        navigate("/invoicetable");
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card title="Edit Invoice">
        <div>
          <form className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
            <Textinput
                label="Customer Name"
                placeholder="Ex: John, Smith, etc."
                id="cust_name"
              />
            <Textinput
                label="Issue Date"
                placeholder="Ex: 2021-07-01"
                id="issue_date"
              />
              <Textinput
                label="Customer Phone"
                placeholder="Ex: 1234567890"
                id="cust_phone"
              />
              <Textinput
                label="Customer Email"
                placeholder="Ex:viralgautami@gmail.com"
                id="cust_email"
              />
              <Textarea
                label="Customer Address"
                placeholder="Ex: 1234 Main St"
                id="cust_address"
              />
              <Textinput
                label="Receipt Name"
                placeholder="Ex: ABC Pvt Ltd"
                id="res_name"
              />
              <Textinput
                label="Receipt Phone"
                placeholder="Ex: 1234567890"
                id="res_phone"
              />
              <Textinput
                label="Receipt Email"
                placeholder="Ex: viralgautami@gmail.com"
                id="res_email"
              />
              <Textarea
                label="Receipt Address"
                placeholder="Ex: 1234 Main St"
                id="res_address"
              />
              <Textarea
                label="Additional Information"
                placeholder="Ex: Additional Information"
                id="additional_info"
              />
              <Textinput
                label="Total Amount"
                placeholder="Ex: 10000"
                id="total_amount"
              />
              <Textinput
                label="Item Name"
                placeholder="Ex: Item Name"
                id="item_name"
              />
              <Textinput
                label="Item Quantity"
                placeholder="Ex: 1"
                id="item_quantity"
              />
              <InputGroup
                label="Status"
                placeholder="Ex: Paid, Unpaid"
                id="status"
              />
            </div>
            <div className="ltr:text-left rtl:text-right">
              <button
                className="btn btn-primary text-center"
                onClick={invoiceedit}
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

export default invoiceedit;