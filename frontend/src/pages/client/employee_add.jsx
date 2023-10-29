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

const employeeaddtable = () => {
  const navigate = useNavigate();

  const [cust, setUser] = useState();

  const custadd = async (e) => {
    e.preventDefault();
    const firstname = document.getElementById("first_name").value;
    const lastname = document.getElementById("last_name").value;
    const position = document.getElementById("position").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const salary = document.getElementById("salary").value;
    try {
      const res = await axios.post(
        "http://localhost:5000/employee_add",
        {
          firstname,
          lastname,
          position,
          email,
          phone,
          salary,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res) {
        alert(res.data.message);
        navigate("/employeetable");
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card title="Add Customer">
        <div>
          <form className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
              <Textinput
                label="First Name"
                placeholder="Ex: John, Smith, etc."
                id="first_name"
              />
              <Textinput
                label="Last Name"
                placeholder="Ex: Patel, Shah, etc."
                id="last_name"
              />
              <Textinput
                label="position"
                id="position"
                placeholder="Ex: it,.. Ltd"
              />
              <Textinput label="Email" id="email" placeholder="xyz@gmail.com" />
              <InputGroup
                label="Phone Number"
                prepend="IN (+91)"
                placeholder="Phone Number"
                id="phone"
                options={{ phone: true, phoneRegionCode: "US" }}
                isMask
              />
              <Textinput label="Salary" placeholder="Ex: 10000" id="salary" />
            </div>
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

export default employeeaddtable;
