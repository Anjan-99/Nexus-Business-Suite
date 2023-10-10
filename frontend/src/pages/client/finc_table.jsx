import React from "react";
import Card from "@/components/ui/Card";
import FincRepo from "./react-tables/FincRepo";

const financetable = () => {
  return (
    <div className=" space-y-5">
      <FincRepo />
    </div>
  );
};

export default financetable;
