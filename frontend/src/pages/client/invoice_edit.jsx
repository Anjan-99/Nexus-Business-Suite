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

const issueadd = () => {
  const navigate = useNavigate();

  const [cust, setUser] = useState();
  const submit = (e) => {
    const { name, value } = e.target;
    setUser({ ...cust, [name]: value });
  };

  const custadd = async (e) => {
    //fetch customer name from api and make it as a option
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

    return (
      <div>
        <Card title="Edit Invoice">
          <div>
            <form className="space-y-4 ">
              <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
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
                  name="invoice_number"
                  label="Invoice Number"
                  register={register}
                  onChange={submit}
                  isMask
                  placeholder="Ex: anjan0001, etc."
                />
                <Textinput
                  name="issue_date"
                  label="Issue Date"
                  onChange={submit}
                  isMask
                  placeholder="Ex: 25/08/2023 etc"
                />
                <Textinput
                  name="due_date"
                  label="Due Date"
                  onChange={submit}
                  isMask
                  placeholder="Ex: 27/09/2023 etc."
                />

                <Textinput
                  name="total_amount"
                  label="Total Amount"
                  onChange={submit}
                  placeholder="$8000"
                  isMask
                />
              </div>
              <div className="grid xl:grid-cols-1 grid-cols-1 gap-5">
                <Textarea
                  label="Address"
                  id="pn4"
                  name="address"
                  placeholder="Address"
                  onChange={submit}
                />
              </div>
              <div className="ltr:text-left rtl:text-right">
                <button
                  className="btn btn-primary text-center"
                  onClick={custadd}
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
};

export default issueadd;
