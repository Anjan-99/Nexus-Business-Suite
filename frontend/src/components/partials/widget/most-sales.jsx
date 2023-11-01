import React, { useEffect, useState } from "react";
import world from "@/constant/world-map.json";
import { VectorMap } from "@south-paw/react-vector-maps";

const slaes = (allcountrylist,) => [
  {
    title: `${allcountrylist[0].country}`,
    amount: `$${allcountrylist[0].totalAmount}`,
    cls: "bg-primary-500 ring-primary-500",
  },
  {
    title: `${allcountrylist[1].country}`,
    amount: `$${allcountrylist[1].totalAmount}`,
    cls: "bg-success-500 ring-success-500",
  },
  {
    title: `${allcountrylist[2].country}`,
    amount: `$${allcountrylist[2].totalAmount}`,
    cls: "bg-info-500 ring-info-500",
  },
  {
    title: `${allcountrylist[3].country}`,
    amount: `$${allcountrylist[3].totalAmount}`,
    cls: "bg-warning-500 ring-warning-500",
  },
  {
    title: `${allcountrylist[4].country}`,
    amount: `$${allcountrylist[4].totalAmount}`,
    cls: "bg-success-500 ring-success-500",
  },
  {
    title: `${allcountrylist[5].country}`,
    amount: `$${allcountrylist[5].totalAmount}`,
    cls: "bg-secondary-500 ring-secondary-500",
  },
];

const MostSales = ( props ) => {
  const { allcountrylist } = props;
  const updatedStatistics = slaes(allcountrylist);
  return (
    <div className="md:flex items-center">
      <div className="flex-none">
        <h4 className="text-slate-600 dark:text-slate-200 text-sm font-normal mb-[6px]">
          Total earnings
        </h4>
        <div className="text-xs font-light dark:text-slate-200">
          <span className="text-primary-500">+08%</span> From last month
        </div>
        <ul className="bg-slate-50 dark:bg-slate-900 rounded p-4 min-w-[184px] space-y-5 mt-4">
          {updatedStatistics.map((item, i) => (
            <li
              key={i}
              className="flex justify-between text-xs text-slate-600 dark:text-slate-300"
            >
              <span className="flex space-x-2 rtl:space-x-reverse items-center">
                <span
                  className={` inline-flex h-[6px] w-[6px] bg-primary-500 ring-opacity-25 rounded-full ring-4
                        ${item.cls}
                        `}
                ></span>
                <span>{item.title}</span>
              </span>
              <span>{item.amount}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1">
        <VectorMap {...world} className="dash-codevmap" />
      </div>
    </div>
  );
};

export default MostSales;
