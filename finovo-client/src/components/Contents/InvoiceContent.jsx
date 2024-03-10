import ContentNavbar from "../ContentNavbar/ContentNavbar";
import Button from "../Button/Button";
import { Link } from "@mui/material";
import InvoiceCard from "../InvoiceCard/InvoiceCard";
import { useEffect, useState } from "react";
import axios from "axios";
import InvoiceDetailsModal from "../InvoiceDetailsModal/InvoiceDetailsModal";

export default function InvoiceContent({ fetchInvoices }) {
  const dateTime = new Date();
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isInvoiceDetailsOpen, setIsInvoiceDetailsOpen] = useState(false);

  const openInvoiceDetails = (invoiceId) => {
    setSelectedInvoice(invoiceId);
    setIsInvoiceDetailsOpen(true);
  };
  const closeInvoiceDetails = () => setIsInvoiceDetailsOpen(false);

  const handleDelete = async (invoiceId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/invoices/${invoiceId}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        reloadInvoices();
      }
    } catch (error) {
      alert(error);
    }
  };
  const handleMarkPaid = async (invoiceId) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/invoices/${invoiceId}/status`,
        { status: "paid" },
        { withCredentials: true }
      );

      if (response.data.success) {
        reloadInvoices();
      }
    } catch (error) {
      alert(error);
    }
  };
  const handleMarkUnpaid = async (invoiceId) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/invoices/${invoiceId}/status`,
        { status: "unpaid" },
        { withCredentials: true }
      );

      if (response.data.success) {
        reloadInvoices();
      }
    } catch (error) {
      alert(error);
    }
  };
  const reloadInvoices = async () => {
    try {
      const response = await fetchInvoices();
      if (response.data.success) {
        const invoiceList = response.data.data.invoices.map((invoice) => ({
          ...invoice,
          total: new Intl.NumberFormat("en-IN").format(invoice.total),
        }));
        setInvoices(invoiceList);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const response = await fetchInvoices();
        if (response.data.success) {
          const invoiceList = response.data.data.invoices.map((invoice) => ({
            ...invoice,
            total: new Intl.NumberFormat("en-IN").format(invoice.total),
          }));
          setInvoices(invoiceList);
        }
      } catch (error) {
        alert(error);
      }
    };
    loadInvoices();
  }, []);

  return (
    <div className="inventory-content m-2 p-2 h-screen flex-grow shadow-xl">
      {!isInvoiceDetailsOpen ? (
        <>
          <div className="inventory-content-navbar mb-8">
            <ContentNavbar>
              <Link underline="hover" color="inherit">
                Home
              </Link>
              <Link underline="hover" color="inherit">
                Display All Invoices
              </Link>
              <Button
                className="p-3 rounded-xl font-semibold text-sm"
                buttonText="Refresh"
                buttonColor="#7A1DF9"
                hoverColor="#7A1DF9"
                textColor="white"
              />
            </ContentNavbar>
          </div>
          <div className="invoice-details bg-white rounded-3xl border-2 border-gray-200 p-4 flex-grow h-[570px] overflow-y-auto overflow-x-hidden">
            <h1 className="text-3xl font-semibold mb-4">Invoices</h1>
            <h1 className="text-xl font-semibold mb-4">All Invoices</h1>
            {invoices.map((invoice) => {
              const invoiceDate = new Date(invoice.date);
              const formattedDate = `${invoiceDate.toLocaleDateString()} at ${invoiceDate.toLocaleTimeString()}`;

              return (
                <InvoiceCard
                  invoiceId={invoice.id}
                  name={invoice.customer_name}
                  invoiceRef={invoice.reference_number}
                  date={formattedDate}
                  total={invoice.total}
                  status={invoice.payment_status}
                  handleDelete={handleDelete}
                  handleMarkPaid={handleMarkPaid}
                  handleMarkUnpaid={handleMarkUnpaid}
                  openInvoiceDetails={openInvoiceDetails}
                />
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="inventory-content-navbar mb-8">
            <ContentNavbar>
              <Link underline="hover" color="inherit">
                Home
              </Link>
              <Link underline="hover" color="inherit">
                Display All Invoices
              </Link>
              <Link underline="hover" color="inherit">
                Display Single Invoice
              </Link>
              <Button
                className="p-3 rounded-xl font-semibold text-sm"
                buttonText="Go Back"
                buttonColor="#E5E7EB"
                hoverColor="#E5E7EB"
                textColor="#7A1DF9"
                onClick={closeInvoiceDetails}
              />
              <Button
                className="p-3 rounded-xl font-semibold text-sm"
                buttonText="Refresh"
                buttonColor="#7A1DF9"
                hoverColor="#7A1DF9"
                textColor="white"
              />
            </ContentNavbar>
          </div>
          <div className="invoice-details bg-white rounded-3xl border-2 border-gray-200 p-4 flex-grow h-[570px] overflow-y-auto overflow-x-hidden">
            <InvoiceDetailsModal
              selectedInvoice={selectedInvoice}
              closeInvoiceDetails={closeInvoiceDetails}
            />
          </div>
        </>
      )}
    </div>
  );
}
