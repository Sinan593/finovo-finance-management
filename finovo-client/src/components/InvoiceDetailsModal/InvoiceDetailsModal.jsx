import { useEffect, useState } from "react";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import CustomInvoiceDetailsTable from "../CustomInvoiceDetailsTable/CustomInvoiceDetailsTable";
import axios from "axios";

export default function invoiceDetailsModal({
  selectedInvoice,
  closeInvoiceDetails,
}) {
  const [invoice, setInvoice] = useState({});
  const [invoiceItems, setInvoiceItems] = useState([]);

  useEffect(() => {
    const loadSingleInvoice = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/invoices/${selectedInvoice}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          const loadedInvoice = response.data.data.invoice;
          const dateTime = new Date(loadedInvoice.date);
          loadedInvoice.date = dateTime.toLocaleDateString();
          setInvoice(loadedInvoice);
        }
      } catch (error) {
        alert(error);
      }
    };
    const loadInvoiceItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/invoice_items/${selectedInvoice}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          const loadedInvoiceItems = response.data.data.invoiceItems;
          setInvoiceItems(loadedInvoiceItems);
        }
      } catch (error) {
        console.log(
          `Error while fetching invoice items inside Invoice Details Modal ${error}`
        );
      }
    };

    loadSingleInvoice();
    loadInvoiceItems();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold mb-4">Invoice Details</h1>
      <h1 className="text-xl font-semibold mb-4">{invoice.reference_number}</h1>
      <InputField
        className={
          "bg-gray-100 h-10 p-2 border-2 w-full rounded-md shadow-sm hover:border-purple-500"
        }
        labelText={"Invoice Number"}
        type={"text"}
        value={invoice.reference_number}
        readOnly
      />

      <span className="flex flex-row gap-4">
        <InputField
          className={
            "bg-gray-100 h-10 p-2 border-2 w-full rounded-md shadow-sm hover:border-purple-500"
          }
          labelText={"Issue Date"}
          type={"text"}
          value={invoice.date}
          readOnly
        />
        <InputField
          className={
            "bg-gray-100 h-10 p-2 border-2 w-full rounded-md shadow-sm hover:border-purple-500"
          }
          labelText={"Payment Status"}
          type={"text"}
          value={invoice.payment_status}
          readOnly
        />
      </span>

      <span className="flex flex-row gap-4">
        <InputField
          className={
            "bg-gray-100 h-10 p-2 border-2 w-full rounded-md shadow-sm hover:border-purple-500"
          }
          labelText={"Bill From"}
          type={"text"}
          placeholder={"Enter your company name"}
        />
        <InputField
          className={
            "bg-gray-100 h-10 p-2 border-2 w-full rounded-md shadow-sm hover:border-purple-500"
          }
          labelText={"Bill To"}
          type={"text"}
          value={invoice.customer_name}
          readOnly
        />
      </span>
      <CustomInvoiceDetailsTable invoiceItems={invoiceItems} />

      <span className="flex flex-row gap-16 justify-center items-center">
        <InputField
          className={
            "bg-gray-100 h-10 p-2 border-2 w-full rounded-md shadow-sm hover:border-purple-500"
          }
          type={"text"}
          labelText={"Subtotal:"}
          value={invoice.subtotal}
          readOnly
        />
        <span className="pt-6 text-xl">+</span>
        <InputField
          className={
            "bg-gray-100 h-10 p-2 border-2 w-full rounded-md shadow-sm hover:border-purple-500"
          }
          type={"text"}
          labelText={"Tax:"}
          value={invoice.tax}
          readOnly
        />
        <span className="pt-6 text-xl">=</span>
        <InputField
          className={
            "bg-gray-100 h-10 p-2 border-2 w-full rounded-md shadow-sm hover:border-purple-500"
          }
          type={"text"}
          labelText={"Total:"}
          value={invoice.total}
          readOnly
        />
      </span>
    </>
  );
}
