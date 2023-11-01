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

const vendoredit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const getdata = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/vendor_find/${id}`,
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
      document.getElementById("name").value = user.name;
      document.getElementById("company_name").value = user.company_name;
      document.getElementById("email").value = user.email;
      document.getElementById("payable_amount").value = user.payable_amount;
      document.getElementById("unused_credit").value = user.unused_credit;
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const vendoredit = async (e) => {
    e.preventDefault(); //form inputs
    const id = user._id;
    const name = document.getElementById("name").value;
    const company_name = document.getElementById("company_name").value;
    const email = document.getElementById("email").value;
    const payable_amount = document.getElementById("payable_amount").value;
    const unused_credit = document.getElementById("unused_credit").value;
    try {
      const res = await axios.put(
        "http://localhost:5000/vendorupdate",
        {
          id,
          name,
          company_name,
          email,
          payable_amount,
          unused_credit
          
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
      <Card title="Edit Vendor">
        <div>
          <form className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
            <Textinput
                label="Name"
                placeholder="Ex: John, Smith, etc."
                id="name"
              />
              <Textinput
                label="Company Name"
                placeholder="Ex: John, Smith, etc."
                id="company_name"
              />
              <Textinput
                label="Email"
                placeholder="Ex: John, Smith, etc."
                id="email"
              />
              <Textinput
                label="Payable Amount"
                placeholder="Ex: John, Smith, etc."
                id="payable_amount"
              />
              <Textinput
                label="Unused Credit"
                placeholder="Ex: John, Smith, etc."
                id="unused_credit"
              />
            </div>
            <div className="ltr:text-left rtl:text-right">
              <button
                className="btn btn-primary text-center"
                onClick={vendoredit}
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

export default vendoredit;