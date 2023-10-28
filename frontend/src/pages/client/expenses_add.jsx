import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import InputGroup from "@/components/ui/InputGroup";
import Textarea from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import * as yup from "yup";
import CustAdd from "./react-tables/CustAdd";
import axios from "axios";

const expensesadd = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [selectedOption, setSelectedOption] = useState({});
  const [mode_of_payment, setMode] = useState({});
  const customer = async () => {
    try {
      const res = await axios.get("http://localhost:5000/fetchvendor", {
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
    cust.push({ value: user[i].company_name, label: user[i].company_name });
  }

  const custmap = cust.map((company_name) => {
    return company_name.company_name;
  });

  //fill selected customer info in the form
  const fillcust = (e) => {
    for (let i = 0; i < user.length; i++) {
      if (user[i].company_name === e.value) {
        const selectedOption = user[i]; 
        setSelectedOption(selectedOption);
        document.getElementById("cust_name").value = selectedOption.name;
      }
    }
  };
  const handlechange = (e) => {
    setMode(e.value);
  };

  const custadd = async (e) => {
    e.preventDefault();
    const vendor_name = selectedOption.company_name;
    const customer_name = selectedOption.name;
    const expenses = document.getElementById("expenses").value;
    const date = document.getElementById("default-picker").value;
    const item = document.getElementById("Item").value;
    try {
      const res = await axios.post(
        "http://localhost:5000/expenses_add",
        {
          date,
          expenses,
          vendor_name,
          mode_of_payment,
          customer_name,
          item,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res) {
        alert(res.data.message);
        navigate("/expensestable");
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
      <Card title="Add Expenses"> 
        <div>
          <form className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
            <div>
                <label htmlFor=" hh" className="form-label ">
                  Vendor Name
                </label>
                <Select
                  onChange={fillcust}
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue="select"
                  options={cust}
                  styles={styles}
                  id="vendor"
                />
              </div>
              <Textinput
                label="Customer Name"
                id = "cust_name"
                placeholder="Ex: viral gautami, ... etc."
              />
              
              <Textinput
                label="Expenses"
                id = "expenses"
                isMask
                placeholder="Ex: $9000,... etc"
              />
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
                  Mode of Payment
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  options={Modeofpay}
                  styles={styles}
                  onChange={handlechange}
                  id="mode_of_payment"
                />
              </div>
              <Textinput
                label="Item"
                id = "Item"
                placeholder="Ex: SaaS,... etc"
              />
            </div>
            <div className="ltr:text-left rtl:text-right">
              <button className="btn btn-primary text-center" onClick={custadd}>Submit</button>
            </div>
          </form>
        </div>
        <br />
      </Card>
    </div>
  );
  
};


export default expensesadd;



