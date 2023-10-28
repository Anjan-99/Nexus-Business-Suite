import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import InputGroup from "@/components/ui/InputGroup";
import Textarea from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Fileinput from "@/components/ui/Fileinput";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustAdd from "./react-tables/CustAdd";
import axios from "axios";

const billsadd = () => {
  const [selectedFiles2, setSelectedFiles2] = useState([]);
  const navigate = useNavigate();

  const [cust, setUser] = useState();
  const submit = (e) => {
    const { name, value } = e.target;
    setUser({ ...cust, [name]: value });
  };

  const handleFileChangeMultiple2 = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files).map((file) => file);
    setSelectedFiles2(filesArray);
  };

  const custadd = async (e) => {
    e.preventDefault();

    const { vendor_name, bill, bill_date, due_date, amount } = cust; //form inputs
    try {
      const res = await axios.post(
        "http://localhost:5000/customer_add",
        {
          vendor_name,
          bill,
          bill_date,
          due_date,
          amount,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res) {
        alert(res.data.message);
        setTimeout(() => {
          navigate("/bill_table"); //redirect to table
        }, 1500);
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card title="Add Bill">
        <div>
          <form className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
              <Textinput
                label="Vendor Name"
                onChange={submit}
                isMask
                placeholder="Ex: viral gautami, ... etc."
              />
              <Textinput
                label="Bill"
                onChange={submit}
                isMask
                placeholder="Ex: flat_fee, etc."
              />
              <Textinput
                label="Bill Date"
                onChange={submit}
                isMask
                placeholder="Ex: 24/09/2023,... etc"
              />
              <Textinput
                label="Due Date"
                onChange={submit}
                isMask
                placeholder="Ex: 25/09/2023,.. etc."
              />
              <Textinput
                label="Amount"
                onChange={submit}
                placeholder="Ex: $6000,... etc."
                isMask
              />
            </div>
            <label htmlFor=" hh" className="form-label ">
            Bill Attachment
            </label>
            <Fileinput
              Label="Bill Attachment"
              selectedFiles={selectedFiles2}
              onChange={handleFileChangeMultiple2}
              multiple
              preview
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

export default billsadd;
