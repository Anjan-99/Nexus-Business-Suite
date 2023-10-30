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
import CustAdd from "./react-tables/CustAdd";
import axios from "axios";

const custedit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const getdata = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/customer_find/${id}`,
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
      document.getElementById("firstname").value = user.firstname;
      document.getElementById("lastname").value = user.lastname;
      document.getElementById("companyname").value = user.companyname;
      document.getElementById("businessType").value = user.businessType;
      document.getElementById("email").value = user.email;
      document.getElementById("phoneNumber").value = user.phone;
      document.getElementById("Address").value = user.address;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const custedit = async (e) => {
    e.preventDefault(); //form inputs
    const id = user._id;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const companyname = document.getElementById("companyname").value;
    const businessType = document.getElementById("businessType").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phoneNumber").value;
    const address = document.getElementById("Address").value;
    try {
      const res = await axios.put(
        "http://localhost:5000/customerupdate",
        {
          id,
          firstname,
          lastname,
          companyname,
          businessType,
          email,
          phone,
          address,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res) {
        alert(res.data.message);
        navigate("/customertable");
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card title="Edit Customer">
        <div>
          <form className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
              <Textinput
                label="First Name"
                placeholder="Ex: John, Smith, etc."
                id="firstname"
              />
              <Textinput
                label="Last Name"
                placeholder="Ex: Patel, Shah, etc."
                id="lastname"
              />
              <Textinput
                label="Company Name"
                id="companyname"
                placeholder="Ex: ABC Pvt Ltd"
              />
              <Textinput
                label="Business Type"
                placeholder="Ex: Retailer, Wholesaler, etc."
                id="businessType"
              />

              <Textinput label="Email" id="email" placeholder="xyz@gmail.com" />
              <InputGroup
                label="Phone Number"
                prepend="IN (+91)"
                placeholder="Phone Number"
                id="phoneNumber"
                options={{ phone: true, phoneRegionCode: "US" }}
              />
            </div>
            <div className="grid xl:grid-cols-1 grid-cols-1 gap-5">
              <Textarea label="Address" id="Address" placeholder="Address" />
            </div>
            <div className="ltr:text-left rtl:text-right">
              <button
                className="btn btn-primary text-center"
                onClick={custedit}
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
};

export default custedit;
