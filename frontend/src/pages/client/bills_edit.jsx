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

const billsedit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const getdata = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/bill_find/${id}`,
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
      document.getElementById("bill").value = user.bill;
      document.getElementById("vendor_name").value = user.vendor_name;
      document.getElementById("amount").value = user.amount;
      document.getElementById("status").value = user.status;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const billsedit = async (e) => {
    e.preventDefault(); //form inputs
    const id = user._id;
    const bill = document.getElementById("bill").value;
    const vendor_name = document.getElementById("vendor_name").value;
    const amount = document.getElementById("amount").value;
    const status = document.getElementById("status").value;
    try {
      const res = await axios.put(
        "http://localhost:5000/billsupdate",
        {
          id,
          bill,
          vendor_name,
          amount,
          status,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res) {
        alert(res.data.message);
        navigate("/bills");
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card title="Edit Bills">
        <div>
          <form className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
            <Textinput
                label="Bill"
                placeholder="Ex: John, Smith, etc."
                id="bill"
              />
              <Textinput
                label="Vendor Name"
                placeholder="Ex: John, Smith, etc."
                id="vendor_name"
              />
              <Textinput
                label="Amount"
                placeholder="Ex: John, Smith, etc."
                id="amount"
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
                onClick={billsedit}
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

export default billsedit;