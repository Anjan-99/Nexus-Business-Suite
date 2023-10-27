import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "react-select";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Repeater from "./Repeater";
import Flatpickr from "react-flatpickr";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { set } from "mongoose";

const InvoiceAddPage = () => {
  //fetch customer name from api and make it as a option
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState({});
  const [status, setStatus] = useState({});
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

  //handle status change
  const handlechange = (e) => {
    setStatus(e.value);
  };
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
  //add invoice to database
  const addinvoice = async () => {
    const customer_id = selectedOption._id;
    const issue_date = document.getElementById("default-picker").value;
    const cust_name = selectedOption.firstname;
    const cust_phone = selectedOption.phone;
    const cust_email = selectedOption.email;
    const cust_address = selectedOption.address;
    const res_name = document.getElementById("rname").value;
    const res_phone = document.getElementById("rphone").value;
    const res_email = document.getElementById("remail").value;
    const res_address = document.getElementById("raddress").value;
    const item_name = document.getElementById("itemname").value;
    const item_quantity = document.getElementById("quantity").value;
    const total_amount = document.getElementById("total").value;
    const additional_info = document.getElementById("note").value;
    try {
      const res = await axios.post(
        "http://localhost:5000/invoice_add",
        {
          issue_date,
          customer_id,
          cust_name,
          cust_phone,
          cust_email,
          cust_address,
          res_name,
          res_phone,
          res_email,
          res_address,
          item_name,
          item_quantity,
          total_amount,
          additional_info,
          status,
        },
        { withCredentials: true }
      );
      if (res) {
        alert(res.data.message);
        navigate("/invoice_table");
      } else {
        alert(res.data.error);
        navigate("/invoice_table");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const statusdata = [
    { value: "paid", label: "paid" },
    { value: "unpaid", label: "unpaid" },
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
      <Card title="Create new invoice">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div className="lg:col-span-2 col-span-1 text-slate-900 dark:text-slate-300 text-base font-medium">
              Recipient info
            </div>
            <div>
              <label htmlFor="default-picker" className=" form-label">
                Issued Date
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
            <Textinput
              label="Phone"
              type="text"
              id="cphone"
              value=""
              placeholder="Add your phone"
            />
            <Textinput
              label="Email"
              type="email"
              id="cemail"
              value=""
              placeholder="Add your email"
            />
            <div className="lg:col-span-2 col-span-1">
              <Textarea
                label="Address"
                type="email"
                id="caddress"
                value=""
                placeholder="address"
                rows="2"
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div className="lg:col-span-2 col-span-1 text-slate-900 text-base dark:text-slate-300 font-medium">
              Owner info
            </div>

            <Textinput
              label="Name"
              id="rname"
              type="text"
              placeholder="Add your name"
            />
            <Textinput
              label="Phone"
              id="rphone"
              type="text"
              placeholder="Add your phone"
            />
            <div className="lg:col-span-2 col-span-1">
              <Textinput
                label="Email"
                type="email"
                placeholder="Add your email"
                id="remail"
              />
            </div>

            <div className="lg:col-span-2 col-span-1">
              <Textarea
                label="Address"
                type="email"
                placeholder="address"
                id="raddress"
                rows="2"
              />
            </div>
          </div>
          <Textinput
            label="Item Name"
            id="itemname"
            type="text"
            placeholder="Item Name"
          />
          <Textinput
            label="Quantity"
            type="text"
            id="quantity"
            placeholder="Total Quantity"
          />
          <div>
            <Textinput
              label="Total"
              type="text"
              id="total"
              placeholder="Total Amount"
            />
          </div>
          <div>
              <label htmlFor=" hh" className="form-label ">
                Status
              </label>
              <Select
                className="react-select"
                classNamePrefix="select"
                defaultValue="select"
                options={statusdata}
                styles={styles}
                onChange={handlechange}
                id="status"
              />
            </div>
        </div>
        <br />
        <Textarea
          label="Additional note"
          type="text"
          rows="2"
          id="note"
          placeholder="Note"
          className="lg:w-1/2"
        />
        <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse">
          <Button text="Save" className="btn-dark" onClick={addinvoice} />
        </div>
      </Card>
    </div>
  );
};

export default InvoiceAddPage;
