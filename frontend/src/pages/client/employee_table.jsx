import React from "react";
import Card from "@/components/ui/Card";
import EmployeeTable from "./react-tables/EmployeeTable";

const employeetable = () => {
  return (
    <div className=" space-y-5">
      <EmployeeTable />
    </div>
  );
};

export default employeetable;
