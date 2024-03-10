import React, { useState, useEffect } from "react"; // Combine imports from 'react'
import ContentNavbar from "../ContentNavbar/ContentNavbar";
import Button from "../Button/Button";
import SalesCard from "../DashboardCards/SalesCard";
import { Link } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart"; // Ensure this import is correct

import axios from "axios";

export default function DashboardContent() {
  const [monthlySales, setMonthlySales] = useState("");

  useEffect(() => {
    try {
      const getMonthlySales = async () => {
        const response = await axios.get(
          "http://localhost:3000/api/v1/dashboard/monthlySales",
          { withCredentials: true }
        );

        if (response.data.success) {
          const formattedSales = new Intl.NumberFormat("en-IN").format(
            response.data.data.total_sales
          );
          setMonthlySales(formattedSales);
        }
      };

      getMonthlySales();
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <div className="inventory-content m-2 p-8 h-screen flex-grow shadow-xl">
      <div className="inventory-content-navbar mb-8">
        <ContentNavbar>
          <Link underline="hover" color="inherit">
            Home
          </Link>
        </ContentNavbar>
      </div>

      <div className="inventory-details bg-white rounded-3xl border-2 border-gray-200 h-[580px] p-4 flex-grow">
        <h1 className="text-xl font-semibold mb-4">Monthly</h1>
        <SalesCard
          salesAmount={monthlySales}
          label={"Sales"}
          timespan={"Last 30 Days"}
        />
      </div>
    </div>
  );
}
