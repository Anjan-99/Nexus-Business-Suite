import React from "react";
import Card from "@/components/ui/Card";
import Custtable from "./react-tables/CustomerTable";

const customertable = () => {
  return (
    <div className=" space-y-5">
      <Custtable />
    </div>
  );
};

export default customertable;
