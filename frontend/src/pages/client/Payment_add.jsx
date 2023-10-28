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
import axios from "axios";


const paymentadd = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [selectedOption, setSelectedOption] = useState({});
  const [mode_of_payment, setMode] = useState({});
  const customer = async () => {
    try {
      const res = await axios.get("http://localhost:5000/filterpayment", {
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
    cust.push({ value: user[i].cust_name, label: user[i].cust_name });
  }

  const custmap = cust.map((cust_name) => {
    return cust_name.cust_name;
  });

  //fill selected customer info in the form
  const fillcust = (e) => {
    for (let i = 0; i < user.length; i++) {
      if (user[i].cust_name === e.value) {
        const selectedOption = user[i];
        setSelectedOption(selectedOption);
        document.getElementById("unamount").value = selectedOption.total_amount;
        document.getElementById("amount").value = selectedOption.total_amount;
      }
    }
  };
  const handlechange = (e) => {
    setMode(e.value);
  };
  const custadd = async (e) => {
    e.preventDefault();
    const id = selectedOption._id;
    const customer_name = selectedOption.cust_name;
    const invoice_number = selectedOption.invoice_number;
    const date = document.getElementById("default-picker").value;
    const amount = document.getElementById("amount").value;
    const unused_amount = document.getElementById("unamount").value;
    const updateamt = unused_amount - amount;
    console.log(mode_of_payment);
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
      const invoiceres = await axios.put (
        `http://localhost:5000/invoicerecupdate/${id}`,
        {
          id,
          status: "paid",
        },
        { withCredentials: false }
      );
      if (res) {
        if (invoiceres) {
          alert(res.data.message);
          navigate("/paymenttable"); 
        }
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
                  options={Modeofpay}
                  styles={styles}
                  onChange={handlechange}
                  id="hh"
                />
              </div>

              <Textinput
                label="Unpaid Amount"
                placeholder="Unpaid Amount"
                value=""
                id="unamount"
                disabled={true}
              />
            </div>
            <Textinput
              label="Amount"
              id = "amount"
              placeholder="$8000"
              value=""
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
