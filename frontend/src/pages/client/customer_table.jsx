import React from "react";
import Card from "@/components/ui/Card";
import ExampleOne from "./react-tables/ExampleOne";
import FetchUserData from "./react-tables/demotable";

const customertable = () => {
  return (
    <div className=" space-y-5">
      <FetchUserData />
    </div>
  );
};

export default customertable;
