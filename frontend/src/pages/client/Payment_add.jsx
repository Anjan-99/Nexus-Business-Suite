import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";

import Select from "react-select";
import InputGroup from "@/components/ui/InputGroup";
import Textarea from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import Flatpickr from "react-flatpickr";
import CustAdd from "./react-tables/CustAdd";
import axios from "axios";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const paymentadd = () => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [selectedOption, setSelectedOption] = useState({});
  const customer = async () => {
    try {
      const res = await axios.get("http://localhost:5000/fetchcustomer", {
        method: "GET",
        withCredentials: true,
        header: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      const user = res.data;
      setUser(user);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    customer();
  }, []);
  //store firstname in cust array
  const cust = [];
  for (let i = 0; i < user.length; i++) {
    cust.push({ value: user[i].firstname, label: user[i].firstname });
  }

  const custmap = cust.map((firstname) => {
    return firstname.firstname;
  });

  //fill selected customer info in the form
  const fillcust = (e) => {
    for (let i = 0; i < user.length; i++) {
      if (user[i].firstname === e.value) {
        const selectedOption = user[i];
        setSelectedOption(selectedOption);
        document.getElementById("cphone").value = selectedOption.phone;
        document.getElementById("cemail").value = selectedOption.email;
        document.getElementById("caddress").value = selectedOption.address;
      }
    }
  };

  const custadd = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/payment_add",
        {
          customer_name,
          invoice_number,
          mode_of_payment,
          date,
          amount,
          unused_amount,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res) {
        alert(res.data.message);
        setTimeout(() => {
          navigate("/payment_table"); //redirect to table
        }, 1500);
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Modeofpay = [
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
    { value: "Credit Card", label: "Credit Card" },
  ];
  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };
  const [picker, setPicker] = useState(new Date());
  return (
    <div>
      <Card title="Add Payment Records">
        <div>
          <form className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
              <div>
                <label htmlFor="default-picker" className=" form-label">
                  Date
                </label>

                <Flatpickr
                  className="form-control py-2"
                  value={picker}
                  onChange={(date) => setPicker(date)}
                  id="default-picker"
                />
              </div>
              <div>
                <label htmlFor=" hh" className="form-label ">
                  Customer Name
                </label>
                <Select
                  onChange={fillcust}
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue="select"
                  options={cust}
                  styles={styles}
                  id="hh"
                />
              </div>
              <div>
                <label htmlFor=" hh" className="form-label ">
                  Mode of Payment
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={Modeofpay[0]}
                  options={Modeofpay}
                  styles={styles}
                  id="hh"
                />
              </div>
              

              <Textinput
                name="amount"
                label="Unpaid Amount"
                register={register}
              />
              
            </div>
            <Textinput
                name="amount"
                label="Amount"
                register={register}
                placeholder="$8000"
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

export default paymentadd;
