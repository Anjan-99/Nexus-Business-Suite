import React from "react";
import Card from "@/components/ui/Card";
import CustomerTable from "./react-tables/CustomerTable";

const customertable = () => {
  return (
    <div className=" space-y-5">
      <CustomerTable />
    </div>
  );
};

export default customertable;
