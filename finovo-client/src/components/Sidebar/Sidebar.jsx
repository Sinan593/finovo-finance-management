import {
  PeopleOutline as Employee,
  AppsOutline as Apps,
  DocumentOutline as Document,
  CubeOutline as Cube,
  SettingsOutline as Settings,
} from "react-ionicons";

import { useState } from "react";

export default function Sidebar({ onButtonClick }) {
  return (
    <div className="sidebar font-body w-64 text-white bg-black m-2 p-4 rounded-3xl">
      <div className="dashboard-logo text-white font-bold text-xl text-left mb-10">
        Finovo
      </div>
      <div className="dashboard-buttons font-semibold text-gray-300 text-md flex flex-col ">
        <button
          className="bg-black hover:text-white hover:bg-violet-600 p-3.5 pl-6 rounded-lg mb-2 mt-2 flex flex-row gap-4"
          onClick={() => onButtonClick("Overview")}
        >
          <Apps color={"#ffff"} height="20px" width="20px" />
          Overview
        </button>
        <div className="text-gray-300 text-sm font-normal">INVENTORY</div>
        <button
          className="bg-black hover:text-white hover:bg-violet-600 p-3.5 pl-6 rounded-lg mb-2 mt-2 flex flex-row gap-4"
          onClick={() => onButtonClick("Inventory")}
        >
          <Cube color={"#ffff"} height="20px" width="20px" />
          Inventory
        </button>

        <div className="text-gray-300 text-sm font-normal">INVOICES</div>
        <button
          className="bg-black hover:text-white hover:bg-violet-600 p-3.5 pl-6 rounded-lg mb-2 mt-2 flex flex-row gap-4"
          onClick={() => onButtonClick("Invoices")}
        >
          <Document color={"#ffff"} height="20px" width="20px" />
          Invoices
        </button>
        <button
          className="bg-black hover:text-white hover:bg-violet-600 p-3.5 pl-6 rounded-lg mb-2 mt-2 flex flex-row gap-4"
          onClick={() => onButtonClick("Create Invoice")}
        >
          <Employee color={"#ffff"} height="20px" width="20px" />
          Create Invoice
        </button>

        <div className="text-gray-300 text-sm font-normal">EMPLOYEE</div>
        <button
          className="bg-black hover:text-white hover:bg-violet-600 p-3.5 pl-6 rounded-lg mb-2 mt-2 flex flex-row gap-4"
          onClick={() => onButtonClick("Employees")}
        >
          <Employee color={"#ffff"} height="20px" width="20px" />
          Employees
        </button>

        <div className="text-gray-300 text-sm font-normal">OTHERS</div>

        <button
          className="bg-black hover:text-white hover:bg-violet-600 p-3.5 pl-6 rounded-lg mb-2 mt-2 flex flex-row gap-4"
          onClick={() => onButtonClick("Settings")}
        >
          <Settings color={"#ffff"} height="20px" width="20px" />
          Settings
        </button>
      </div>
    </div>
  );
}
