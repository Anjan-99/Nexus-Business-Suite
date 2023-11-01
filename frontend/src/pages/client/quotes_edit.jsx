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

const quoteedit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const getdata = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/quote_find/${id}`,
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
      document.getElementById("quote_number").value = user.quote_number;
      document.getElementById("quote_date").value = user.quote_date;
      document.getElementById("valid_until").value = user.valid_until;
      document.getElementById("cust_address").value = user.cust_address;
      document.getElementById("item_name").value = user.item_name;
      document.getElementById("total_amount").value = user.total_amount;
      document.getElementById("additional_info").value = user.additional_info;
      document.getElementById("status").value = user.status;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const quoteedit = async (e) => {
    e.preventDefault(); //form inputs
    const id = user._id;
    const cust_name = document.getElementById("cust_name").value;
    const quote_number = document.getElementById("quote_number").value;
    const quote_date = document.getElementById("quote_date").value;
    const valid_until = document.getElementById("valid_until").value;
    const cust_address = document.getElementById("cust_address").value;
    const item_name = document.getElementById("item_name").value;
    const total_amount = document.getElementById("total_amount").value;
    const additional_info = document.getElementById("additional_info").value;
    const status = document.getElementById("status").value;
    try {
      const res = await axios.put(
        "http://localhost:5000/quoteupdate",
        {
          id,
          cust_name,
          quote_number,
          quote_date,
          valid_until,
          cust_address,
          item_name,
          total_amount,
          additional_info,
          status,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res) {
        alert(res.data.message);
        navigate("/quotetable");
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card title="Edit Quotes">
        <div>
          <form className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
            <Textinput
                label="Customer Name"
                placeholder="Ex: John, Smith, etc."
                id="cust_name"
              />
              <Textinput
                label="Quote Number"
                placeholder="Ex: 123, 456, etc."
                id="quote_number"
              />
              <Textinput
                label="Quote Date"
                placeholder="Ex: 2021-01-01"
                id="quote_date"
              />
              <Textinput
                label="Valid Until"
                placeholder="Ex: 2021-01-01"
                id="valid_until"
              />
              <Textinput
                label="Customer Address"
                placeholder="Ex: 123, Smith Street, etc."
                id="cust_address"
              />
              <Textinput
                label="Item Name"
                placeholder="Ex: Item 1, Item 2, etc."
                id="item_name"
              />
              <Textinput
                label="Total Amount"
                placeholder="Ex: 100, 200, etc."
                id="total_amount"
              />
              <Textarea
                label="Additional Info"
                placeholder="Ex: Additional Info"
                id="additional_info"
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
                onClick={quoteedit}
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

export default quoteedit;