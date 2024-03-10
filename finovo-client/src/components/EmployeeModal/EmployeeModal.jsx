import InputField from "../InputField/InputField";
import SmallInputField from "../SmallInputField/SmallInputField";
import Button from "../Button/Button";
import { useState } from "react";
import axios from "axios";
export default function EmployeeModal({
  openModal,
  closeModal,
  handleRefresh,
}) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState(0.0);

  const handleCancel = () => {
    closeModal();
  };

  const handleSubmit = async () => {
    const data = {
      firstname,
      lastname,
      email,
      phone,
      job_title: jobTitle,
      salary,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/employees",
        data,
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log(
          `Employee ${response.data.data.employeeId} Added Successfully! `
        );
      }
    } catch (error) {
      console.log(`Error while adding employee: ${error}`);
    } finally {
      handleRefresh();
      closeModal();
    }
  };

  return (
    <div className="create-modal shadow-xl border-2 border-gray-200 p-6 rounded-2xl bg-white h-[500px] w-[700px] overflow-y-auto">
      <span className="text-3xl font-semibold ">Add Employee</span>
      <div className="create-modal-inputs">
        <InputField
          labelText={"First Name"}
          placeholder={"Enter First Name"}
          className="bg-slate-100 rounded-xl h-12 p-2 border-2 border-slate-100 hover:border-purple-500 w-full"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <InputField
          labelText={"Last Name"}
          placeholder={"Enter Last Name"}
          className="bg-slate-100 rounded-xl h-12 p-2 border-2 border-slate-100 hover:border-purple-500 w-full"
          onChange={(e) => setLastname(e.target.value)}
        />
        <InputField
          labelText={"Email"}
          placeholder={"Enter Email"}
          className="bg-slate-100 rounded-xl h-12 p-2 border-2 border-slate-100 hover:border-purple-500 w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="flex flex-row gap-4">
          <SmallInputField
            labelText={"Job Title"}
            placeholder={"Enter your Job Title"}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <SmallInputField
            labelText={"Salary"}
            placeholder={"₹0.00"}
            onChange={(e) => setSalary(e.target.value)}
          />
        </span>
        <span className="flex flex-row gap-4">
          <SmallInputField
            labelText={"Phone"}
            placeholder={"+91 XXXXX XXXXX"}
            onChange={(e) => setPhone(e.target.value)}
          />
        </span>

        <span className="flex flex-row gap-4 justify-end">
          <Button
            className="p-3 rounded-xl font-semibold text-sm"
            buttonText="Cancel"
            buttonColor="#E5E7EB"
            hoverColor="#E5E7EB"
            textColor="#7A1DF9"
            onClick={handleCancel}
          />
          <Button
            className="p-3 rounded-xl font-semibold text-sm"
            buttonText="Submit"
            buttonColor="#7A1DF9"
            hoverColor="#7A1DF9"
            textColor="white"
            onClick={handleSubmit}
          />
        </span>
      </div>
    </div>
  );
}
