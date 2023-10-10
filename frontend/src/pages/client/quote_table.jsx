import React from "react";
import Card from "@/components/ui/Card";
import QuoteTable from "./react-tables/QuoteTable";

const quotetable = () => {
  return (
    <div className="space-y-5">
      <QuoteTable />
    </div>
  );
};

export default quotetable;