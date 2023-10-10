import React from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import InputGroup from "@/components/ui/InputGroup";
import Textarea from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustAdd from "./react-tables/CustAdd";


const FormValidationSchema = yup
  .object({
    password: yup.string().required("Password is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
  })
  .required();

const customeradd = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Card title="Add Customer">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
              <Textinput
                label="First Name"
                isMask
                placeholder="Ex: John, Smith, etc."
              />
              <Textinput
                label="Last Name"
                isMask
                placeholder="Ex: Patel, Shah, etc."
              />
              <Textinput
                label="Company Name"
                isMask
                placeholder="Ex: ABC Pvt Ltd"
              />
              <Textinput
                label="Business Type"
                isMask
                placeholder="Ex: Retailer, Wholesaler, etc."
              />

              <Textinput
                label="Email"
                id="date"
                placeholder="xyz@gmail.com"
                isMask
                register={register}
                error={errors.email}
              />
              <InputGroup
                label="Phone Number"
                prepend="IN (+91)"
                placeholder="Phone Number"
                id="phoneNumber"
                options={{ phone: true, phoneRegionCode: "US" }}
                isMask
              />
            </div>
            <div className="grid xl:grid-cols-1 grid-cols-1 gap-5">
              <Textarea label="Address" id="pn4" placeholder="Address" />
            </div>
            <div className="ltr:text-left rtl:text-right">
              <button className="btn btn-primary  text-center">Submit</button>
            </div>
          </form>
        </div>
        <br />
      </Card>
    </div>
  );
  
};


export default customeradd;



