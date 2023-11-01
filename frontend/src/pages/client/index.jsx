import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import ImageBlock1 from "@/components/partials/widget/block/image-block-1";
import GroupChart2 from "@/components/partials/widget/chart/group-chart-2";
import GroupChart5 from "@/components/partials/widget/chart/group-chart5";
import RevenueBarChart from "@/components/partials/widget/chart/revenue-bar-chart";
import RadialsChart from "@/components/partials/widget/chart/radials";
import SelectMonth from "@/components/partials/SelectMonth";
import CompanyTable from "@/components/partials/Table/company-table";
import Customertable from "./customer_table";
import RecentActivity from "@/components/partials/widget/recent-activity";
import MostSales from "../../components/partials/widget/most-sales";
import ProfitChart from "../../components/partials/widget/chart/profit-chart";
import OrderChart from "../../components/partials/widget/chart/order-chart";
import EarningChart from "../../components/partials/widget/chart/earning-chart";
import RadarChart from "../../components/partials/widget/chart/radar-chart";
import HomeBredCurbs from "./HomeBredCurbs";
import ProfileImage from "@/assets/images/users/user.webp";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import axios from "axios";

const Client = () => {
  const [filterMap, setFilterMap] = useState("usa");
  const [user, setUser] = useState({});
  const [total, setTotal] = useState({});
  const [countrylist, setcountry] = useState({});
  const [count , setcount] = useState({});
  const auth = async () => {
    try {
      const res = await axios.get("http://localhost:5000/verify", {
        method: "GET",
        withCredentials: true,
        header: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      const user = res.data;
      setUser(user);
    } catch (err) {
      console.log(err);
    }
    try {
      const res = await axios.get("http://localhost:5000/fetchinvoiceamount", {
        method: "GET",
        withCredentials: true,
        header: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      const user1 = res.data;
      setTotal(user1);
    } catch (err) {
      console.log(err);
    }
    try {
      const res = await axios.get(
        "http://localhost:5000/invoice_find_address",
        {
          method: "GET",
          withCredentials: true,
          header: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      const user2 = res.data;
      setcountry(user2);
    } catch (err) {
      console.log(err);
    }
    try {
      const res = await axios.get(
        "http://localhost:5000/fetchvendorcustomer", {
        method: "GET",
        withCredentials: true,
        header: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
      );
      const user3 = res.data;
      setcount(user3);
    } catch (err) {
      console.log(err);
    }
  };
  //fetch count 
  

  useEffect(() => {
    auth();
  }, []);
  return (
    <div>
      <HomeBredCurbs title="Dashboard" />
      <Card>
        <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 place-content-center">
          <div className="flex space-x-4 h-full items-center rtl:space-x-reverse">
            <div className="flex-none">
              <div className="h-20 w-20 rounded-full">
                <img src={ProfileImage} alt="" className="w-full h-full" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-medium mb-2">
                <span className="block font-light">Good evening,</span>
                <span className="block">{user.name}</span>
              </h4>
              <p className="text-sm dark:text-slate-300">Welcome to Nexus</p>
            </div>
          </div>
          <GroupChart5
            cashFlowCount={total.cashflow}
            expensesCount={total.expense}
            revenueCount={total.cashflow - total.expense}
          />
        </div>
      </Card>
      <br />
      <div className="grid grid-cols-7 gap-5 mb-5">
        <div className="2xl:col-span-9 lg:col-span-8 col-span-12">
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            <GroupChart2 vendorcount={count.vendorcount} customercount={count.customercount}/>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-7 col-span-12">
          <Card>
            <div className="legend-ring">
              <RevenueBarChart />
            </div>
          </Card>
        </div>
        <div className="2xl:col-span-4 lg:col-span-5 col-span-12">
          <Card title="Statistic" headerslot={<SelectMonth />}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <OrderChart cashFlowCount={total.cashflow}/>
              <ProfitChart expensesCount={total.expense} />
              <div className="md:col-span-2">
                <EarningChart cashFlowCount={total.cashflow} expensesCount={total.expense} />
              </div>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-12 col-span-12">
          <Customertable />
        </div>
        <div className="lg:col-span-12 col-span-12">
          <Card title="Most Sales">
            {/* <MostSales allcountrylist={countrylist} /> */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Client;
