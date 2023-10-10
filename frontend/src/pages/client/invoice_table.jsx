import React from "react";
import Card from "@/components/ui/Card";
import InvoiceTable from "./react-tables/InvoiceTable";

const invoicetable = () => {
  return (
    <div className=" space-y-5">
      <InvoiceTable />
    </div>
  );
};

export default invoicetable;
