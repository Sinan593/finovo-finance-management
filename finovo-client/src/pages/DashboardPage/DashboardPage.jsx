import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MainContent from "../../components/MainContent/MainContent";

export default function DashboardPage() {
  const [activeButton, setActiveButton] = useState("Dashboard");

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="dashboard-container bg-gray-300 flex flex-row h-screen">
      <Sidebar onButtonClick={handleClick} />
      <MainContent activeButtonName={activeButton} />
    </div>
  );
}
