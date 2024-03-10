import OverviewContent from "../Contents/OverviewContent";
import InvoiceContent from "../Contents/InvoiceContent";
import InventoryContent from "../Contents/InventoryContent";
import SettingsContent from "../Contents/SettingsContent";
import EmployeeContent from "../Contents/EmployeeContent";
import CreateInvoiceContent from "../Contents/CreateInvoiceContent";

import axios from "axios";

const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/products", {
      withCredentials: true,
    });

    if (response.data.success) {
      console.log(JSON.stringify(response));
      return response;
    }
  } catch (error) {
    console.log(`Error while fetching products inside mainContent: ${error}`);
  }
};

const fetchInvoices = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/invoices", {
      withCredentials: true,
    });

    if (response.data.success) {
      console.log(JSON.stringify(response));
      return response;
    }
  } catch (error) {
    console.log(`Error while fetching invoices inside mainContent: ${error}`);
  }
};

const fetchInvoiceItems = async (invoiceId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/invoice_items/${invoiceId}`,
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      console.log("HERE LIES THE RESPONSE BELOW");
      console.log(JSON.stringify(response));
      return response;
    }
  } catch (error) {
    console.log(
      `Error while fetching invoice items inside mainContent: ${error}`
    );
  }
};

const createInvoice = async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/v1/invoices", {
      withCredentials: true,
    });

    if (response.data.success) {
      console.log(JSON.stringify(response));
      return response;
    }
  } catch (error) {
    console.log(`Error while creating invoices inside mainContent: ${error}`);
  }
};

export default function MainContent({ activeButtonName }) {
  switch (activeButtonName) {
    case "Overview":
      return (
        <div className="content-container font-body bg-slate-250 flex-grow">
          <OverviewContent />
        </div>
      );
    case "Employees":
      return (
        <div className="content-container font-body bg-slate-250 flex-grow">
          <EmployeeContent />
        </div>
      );
    case "Inventory":
      return (
        <div className="content-container font-body bg-slate-250 flex-grow">
          <InventoryContent fetchProducts={fetchProducts} />
        </div>
      );
    case "Invoices":
      return (
        <div className="content-container font-body bg-slate-250 flex-grow">
          <InvoiceContent fetchInvoices={fetchInvoices} />
        </div>
      );

    case "Create Invoice":
      return (
        <div className="content-container font-body bg-slate-250 flex-grow">
          <CreateInvoiceContent
            fetchInvoiceItems={fetchInvoiceItems}
            fetchProducts={fetchProducts}
          />
        </div>
      );

    case "Settings":
      return (
        <div className="content-container font-body bg-slate-100 flex-grow">
          <SettingsContent />
        </div>
      );

    default:
      return (
        <div className="content-container font-body bg-slate-100 flex-grow">
          <OverviewContent />
        </div>
      );
  }
}
