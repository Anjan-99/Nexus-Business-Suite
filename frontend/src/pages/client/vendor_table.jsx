import React from "react";
import Card from "@/components/ui/Card";
import VendorTable from "./react-tables/VendorTable";

const vendortable = () => {
  return (
    <div className=" space-y-5">
      <VendorTable />
    </div>
  );
};

export default vendortable;
