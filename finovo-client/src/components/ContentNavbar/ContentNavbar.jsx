import { PersonCircleOutline as Person } from "react-ionicons";
import Button from "../Button/Button";
import { Breadcrumbs } from "@mui/material";
import { Link } from "@mui/material";
import React from "react";
export default function ContentNavbar({ children }) {
  const { breadcrumbs, buttons } = React.Children.toArray(children).reduce(
    (acc, child) => {
      if (React.isValidElement(child)) {
        if (child.type === Button) {
          acc.buttons.push(child);
        }
        if (child.type === Link) {
          acc.breadcrumbs.push(child);
        }
      }
      return acc;
    },
    { breadcrumbs: [], buttons: [] }
  );

  return (
    <>
      <div className="content-navbar p-2 text-gray-500 rounded-lg flex flex-row justify-between">
        <div className="content-navbar-left">
          <Breadcrumbs separator=">">
            {/* <Link className="" underline="hover" color="inherit">
              Inventory
            </Link> */}
            {breadcrumbs}
          </Breadcrumbs>
        </div>
        <div className="content-navbar-right flex flex-row gap-2">
          {/* <Button
            className="p-2 rounded-xl text-sm"
            buttonText="Download Invoice"
            buttonColor="#7065f0"
            hoverColor="#7b76ff"
            textColor="white"
          />
          <Button
            className="p-2 rounded-xl text-sm"
            buttonText="Save as Draft"
            buttonColor="#7065f0"
            hoverColor="#7b76ff"
            textColor="white"
          /> */}
          {buttons}
        </div>
      </div>
    </>
  );
}
