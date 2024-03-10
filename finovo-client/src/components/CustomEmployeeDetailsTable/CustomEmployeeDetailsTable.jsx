import { useState, useEffect } from "react";
import InputFieldNoLabel from "../InputFieldNoLabel/InputFieldNoLable";
import InputFieldNoLabelSmall from "../InputFieldNoLabel/InputFieldNoLabelSmall";
import { Create, Trash } from "react-ionicons";

import axios from "axios";

export default function CustomEmployeeDetailsTable({
  employees,
  handleRefresh,
}) {
  const deleteEmployee = async (employeeId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/employees/${employeeId}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        handleRefresh();
      }
    } catch (error) {}
  };

  return (
    <div className="table-container overflow-y-auto h-[550px] mb-8">
      <table className="bg-white text-black min-w-full border-collapse text-sm rounded-3xl">
        <thead className="bg-black text-white h-16">
          <tr>
            <th className="rounded-tl-3xl">Action</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job Title</th>
            <th className="rounded-tr-3xl">Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <tr key={employee.id} className="rounded-bl-3xl h-16">
                <td>
                  <button className="m-1 p-1">
                    <Create color={"black"} height="20px" width="20px" />
                  </button>
                  <button
                    className="m-1 p-1"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    <Trash color={"black"} height="20px" width="20px" />
                  </button>
                </td>
                <td>
                  <InputFieldNoLabel inputText={employee.firstname} />
                </td>
                <td>
                  <InputFieldNoLabel inputText={employee.lastname} />
                </td>
                <td>
                  <InputFieldNoLabel inputText={employee.email} />
                </td>
                <td>
                  <InputFieldNoLabel inputText={employee.phone} />
                </td>
                <td>
                  <InputFieldNoLabel inputText={employee.job_title} />
                </td>
                <td className="rounded-br-3xl">
                  <InputFieldNoLabel inputText={employee.salary} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
