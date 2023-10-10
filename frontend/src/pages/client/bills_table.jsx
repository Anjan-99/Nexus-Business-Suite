import React from "react";
import Card from "@/components/ui/Card";
import Bills from "./react-tables/Bills";

const billstable = () => {
  return (
    <div className=" space-y-5">
      <Bills />
    </div>
  );
};

export default billstable;
