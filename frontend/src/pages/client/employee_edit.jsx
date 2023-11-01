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

const employeeedit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const getdata = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/employee_find/${id}`,
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
      document.getElementById("email").value = user.email;
      document.getElementById("phone").value = user.phone;
      document.getElementById("position").value = user.position;
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const employeeedit = async (e) => {
    e.preventDefault(); //form inputs
    const id = user._id;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const position = document.getElementById("position").value;
    try {
      const res = await axios.put(
        "http://localhost:5000/employeeupdate",
        {
          id,
          firstname,
          lastname,
          email,
          phone,
          position,

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
      <Card title="Edit Employee">
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
                placeholder="Ex: John, Smith, etc."
                id="lastname"
              />
              <Textinput
                label="Email"
                placeholder="Ex: John, Smith, etc."
                id="email"
              />
              <Textinput
                label="Phone"
                placeholder="Ex: John, Smith, etc."
                id="phone"
              />
              <Textinput
                label="Position"
                placeholder="Ex: John, Smith, etc."
                id="position"
              />
            </div>
            <div className="ltr:text-left rtl:text-right">
              <button
                className="btn btn-primary text-center"
                onClick={employeeedit}
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

export default employeeedit;