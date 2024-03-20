import React, { useState, useEffect } from "react"; // Combine imports from 'react'
import ContentNavbar from "../ContentNavbar/ContentNavbar";
import Button from "../Button/Button";
import SalesCard from "../DashboardCards/SalesCard";
import { Link } from "@mui/material";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Brush,
  Cell,
} from "recharts";
import { PieChart } from "@mui/x-charts/PieChart";

import axios from "axios";
import MessageCard from "../MessageCard/MessageCard";

export default function DashboardContent() {
  const [monthlySales, setMonthlySales] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [yearlyProfits, setYearlyProfits] = useState([]);
  const [colors, setColors] = useState(["purple", "blue", "violet"]);
  const [invoiceDetails, setInvoiceDetails] = useState({ paid: 0, unpaid: 0 });

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

      const getAllNotifications = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/v1/dashboard/getAllNotifications",
            { withCredentials: true }
          );

          if (response.data.success) {
            const loadedNotifications = response.data.data.notifications;
            setNotifications(loadedNotifications);
          }
        } catch (error) {
          alert(error);
        }
      };

      const getYearlyProfits = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/v1/dashboard/getYearlyProfit",
            { withCredentials: true }
          );

          if (response.data.success) {
            const profitsData = response.data.data.yearlyProfits;
            const allMonths = [
              "2024-01",
              "2024-02",
              "2024-03",
              "2024-04",
              "2024-05",
              "2024-06",
              "2024-07",
              "2024-08",
              "2024-09",
              "2024-10",
              "2024-11",
              "2024-12",
            ];

            let chartData = allMonths.map((month) => {
              const foundProfit = profitsData.find(
                (profit) => profit.month === month
              );
              return foundProfit
                ? { month: month, Profit: foundProfit.monthly_profit }
                : { month: month, Profit: 0 };
            });

            console.log(chartData);
            setYearlyProfits(chartData);
          }
        } catch (error) {
          alert(error);
        }
      };

      const getInvoiceDetails = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/v1/dashboard/getInvoiceDetails",
            { withCredentials: true }
          );

          if (response) {
            const loadedInvoiceDetails = response.data.invoice_details;
            console.log(JSON.stringify(loadedInvoiceDetails));
            setInvoiceDetails(loadedInvoiceDetails);
          }
        } catch (error) {
          alert(error);
        }
      };

      getMonthlySales();
      getAllNotifications();
      getYearlyProfits();
      getInvoiceDetails();
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <div className="inventory-content m-2 p-4 h-screen flex-grow shadow-xl h-[570px] overflow-y-auto">
      <div className="inventory-content-navbar mb-8">
        <ContentNavbar>
          <Link underline="hover" color="inherit">
            Home
          </Link>
        </ContentNavbar>
      </div>

      <div className="notifications-details bg-white rounded-3xl border-2 border-gray-200 mt-4 mb-4 p-4 flex-grow">
        <h1 className="text-xl font-semibold mb-4">Notifications</h1>
        <div className="notifications flex flex-col items-center h-[250px] overflow-y-auto overflow-x-hidden">
          {notifications.map((notification) => {
            return (
              <MessageCard
                invoiceId={notification.id}
                name={notification.message}
                date={notification.createdAt}
                status={"unpaid"}
                // handleDelete={handleDelete}
              />
            );
          })}

          <button className="rounded-xl hover:bg-gray-200 p-2 w-full">
            View All
          </button>
        </div>
      </div>
      <div className="sales-details bg-white rounded-3xl border-2 border-gray-200 mt-4 mb-4 p-4 flex-grow">
        <div className="sales">
          <h1 className="text-xl font-semibold mb-4">Sales</h1>
          <SalesCard
            salesAmount={monthlySales}
            label={"Sales"}
            timespan={"Last 30 Days"}
          />
        </div>
      </div>

      <div className="sales-details bg-white rounded-3xl border-2 border-gray-200 mt-4 mb-4 p-4 flex-grow">
        <div className="sales">
          <h1 className="text-xl font-semibold mb-4">Visualizations</h1>

          <div className="visulaization-container flex flex-row justify-evenly">
            <div className="piechart">
              <PieChart
                series={[
                  {
                    data: [
                      { value: invoiceDetails.paid, label: "Paid" },
                      { value: invoiceDetails.unpaid, label: "Unpaid" },
                    ],
                  },
                ]}
                width={500}
                height={300}
              />
            </div>
            <div className="barchart">
              <BarChart width={600} height={500} data={yearlyProfits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Brush dataKey="month" height={30} stroke="#8884d8" />
                <Bar dataKey="Profit" fill="#8884d8">
                  {yearlyProfits.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                  ))}
                </Bar>
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
