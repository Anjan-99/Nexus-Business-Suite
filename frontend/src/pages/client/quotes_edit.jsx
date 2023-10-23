import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Select from "react-select";
import InputGroup from "@/components/ui/InputGroup";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();

const quotesadd = () => {
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
      console.log(user);
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

  const getcustdata = (e) => {
    for (let i = 0; i < user.length; i++) {
      if (user[i].firstname === e.value) {
        const selectedOption = user[i];
        setSelectedOption(selectedOption);
      }
    }
  };

  const addquote = async (e) => {
    e.preventDefault();
    const customer_id = selectedOption._id;
    const cust_name = selectedOption.firstname;
    const quote_number = document.getElementById("quote_number").value;
    const quote_date = document.getElementById("quote_date").value;
    const valid_until = document.getElementById("valid_until").value;
    const item_name = document.getElementById("item_name").value;
    const total_amount = document.getElementById("total_amount").value;
    const additional_info = document.getElementById("additional_info").value;
    console.log(customer_id);
    try {
      const res = await axios.post(
        "http://localhost:5000/quote_add",
        {
          customer_id,
          cust_name,
          quote_number,
          quote_date,
          valid_until,
          item_name,
          total_amount,
          additional_info,
        },
      );
      if (res) {
        alert(res.data.message);
        navigate("/quotetable");
      } else {
        alert(res.data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };
  const [picker, setPicker] = useState(new Date());
  const [picker2, setPicker2] = useState(new Date());
  return (
    <div>
      <Card title="Add Quote">
        <div>
          <form className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
              <div>
                <label htmlFor=" hh" className="form-label ">
                  Customer Name
                </label>
                <Select
                  className="react-select"
                  onChange={getcustdata}
                  classNamePrefix="select"
                  defaultValue="select"
                  options={cust}
                  styles={styles}
                  id="customer_name"
                />
              </div>
              <Textinput
                name="quote_number"
                label="Quote Number"
                register={register}
                id="quote_number"
                placeholder="Ex: anjan0001, etc."
              />
              <div>
                <label htmlFor="default-picker" className=" form-label">
                  Quote Date
                </label>

                <Flatpickr
                  className="form-control py-2"
                  value={picker}
                  onChange={(date) => setPicker(date)}
                  id="quote_date"
                />
              </div>
              <div>
                <label htmlFor="default-picker" className=" form-label">
                  Valid Till
                </label>

                <Flatpickr
                  className="form-control py-2"
                  value={picker2}
                  onChange={(date) => setPicker2(date)}
                  id="valid_until"
                />
              </div>

              <Textinput
                name="item_name"
                label="Item Name"
                register={register}
                placeholder="Ex: Laptop, etc."
                id="item_name"
              />
              <Textinput
                name="total_amount"
                label="Total Amount"
                register={register}
                placeholder="$8000"
                id="total_amount"
              />
            </div>
            <div className="grid xl:grid-cols-1 grid-cols-1 gap-5">
              <Textarea
                label="Additional Info"
                id="additional_info"
                name="additional_info"
                placeholder="Additional Info"
                register={register}
              />
            </div>
            <div className="ltr:text-left rtl:text-right">
              <button
                className="btn btn-primary text-center"
                onClick={addquote}
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

export default quotesadd;
