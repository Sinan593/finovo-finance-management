import ContentNavbar from "../ContentNavbar/ContentNavbar";
import Button from "../Button/Button";
import CustomEmployeeDetailsTable from "../CustomEmployeeDetailsTable/CustomEmployeeDetailsTable";

import { Link } from "@mui/material";

import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import EmployeeModal from "../EmployeeModal/EmployeeModal";

export default function EmployeeContent() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/employees",
          { withCredentials: true }
        );

        if (response.data.success) {
          const loadedEmployees = response.data.data.employees;
          console.log(JSON.stringify(loadedEmployees));
          setEmployees(loadedEmployees);
        }
      } catch (error) {
        alert(error);
      }
    };

    loadEmployees();
  }, []);

  const handleRefresh = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/employees",
        { withCredentials: true }
      );

      if (response.data.success) {
        const loadedEmployees = response.data.data.employees;
        console.log(JSON.stringify(loadedEmployees));
        setEmployees(loadedEmployees);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="inventory-content m-2 p-2 h-screen flex-grow shadow-xl">
      <div className="inventory-content-navbar mb-8">
        <ContentNavbar>
          <Link underline="hover" color="inherit">
            Home
          </Link>
          <Link underline="hover" color="inherit">
            Inventory
          </Link>
          <Button
            className="p-3 rounded-xl font-semibold text-sm"
            buttonText="Refresh"
            buttonColor="#E5E7EB"
            hoverColor="#E5E7EB"
            textColor="#7A1DF9"
            onClick={handleRefresh}
          />
          <Button
            className="p-3 rounded-xl font-semibold text-sm"
            buttonText="Add Employee"
            buttonColor="#7A1DF9"
            hoverColor="#7A1DF9"
            textColor="white"
            onClick={openModal}
          />
        </ContentNavbar>
      </div>

      {!isModalOpen ? (
        <div className="inventory-details bg-white rounded-3xl border-2 border-gray-200 h-[580px] p-4 flex-grow">
          <h1 className="text-3xl font-semibold mb-4">Employees</h1>
          <CustomEmployeeDetailsTable
            employees={employees}
            handleRefresh={handleRefresh}
          />
        </div>
      ) : (
        <div className="create-modal-container flex justify-center items-center">
          <EmployeeModal
            openModal={openModal}
            closeModal={closeModal}
            handleRefresh={handleRefresh}
          />
        </div>
      )}
    </div>
  );
}
