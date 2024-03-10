import ContentNavbar from "../ContentNavbar/ContentNavbar";
import InputField from "../InputField/InputField";
import CustomInvoiceTable from "../CustomInvoiceTable/CustomInvoiceTable";
import { Link } from "@mui/material";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Add from "../Add/Add";
import InvoiceItemModal from "../InvoiceItemModal/InvoiceItemModal";

export default function CreateInvoiceContent({
  fetchInvoiceItems,
  fetchProducts,
}) {
  const [isInvoiceCreated, setInvoiceCreated] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [invoice, setInvoice] = useState({});
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isInvoiceItemModal, setIsInvoiceItemModal] = useState(false);

  const openItemListModal = () => setIsInvoiceItemModal(true);
  const closeItemListModal = () => setIsInvoiceItemModal(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        if (response.data.success) {
          const productsList = response.data.data.products;
          setProducts(productsList);
        }
      } catch (error) {
        alert(error);
      }
    };

    // const loadInvoiceItems = async () => {
    //   try {
    //     const response = await fetchInvoiceItems(1);
    //     if (response.data.success) {
    //       const invoiceItemsList = response.data.data.invoiceItems;
    //       setInvoiceItems(invoiceItemsList);
    //     }
    //   } catch (error) {
    //     alert(error);
    //   }
    // };
    loadProducts();
    // loadInvoiceItems();
  }, []);

  const createInvoiceItem = async (invoiceId, productId, data) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/invoice_items/${invoiceId}/${productId}`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log(JSON.stringify(response));
        return response;
      }
    } catch (error) {
      console.log(
        `Error while creating invoices inside createInvoiceContent: ${error}`
      );
    }
  };

  const getSingleInvoice = async (invoiceId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/invoices/${invoiceId}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log(JSON.stringify(response));
        return response;
      }
    } catch (error) {
      console.log(
        `Error while getting single invoices inside createInvoiceContent: ${error}`
      );
    }
  };

  // const fetchAndSetInvoiceItems = async (invoiceId) => {
  //   try {
  //     const response = await fetchInvoiceItems(invoice.id);
  //     if (response.data.success) {
  //       const newinvoiceItems = response.data.data.invoiceItems;
  //       setInvoiceItems(newinvoiceItems);
  //     }
  //   } catch (error) {}
  // };
  const handleApplyChanges = () => {
    alert("Changes applied successfully!");
  };

  const handleSaveAsDraft = () => {
    alert("Saved to Draft");
  };

  const refreshStates = async () => {
    try {
      const response = await getSingleInvoice(invoice.id);
      if (response.data.success) {
        const refreshedInvoice = response.data.data.invoice;
        const dateTime = new Date(refreshedInvoice.date);
        refreshedInvoice.date = dateTime.toLocaleDateString();
        setInvoice(refreshedInvoice);
      }
    } catch (error) {}
  };

  const createInvoice = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/invoices",
        data,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log(JSON.stringify(response));
        return response;
      }
    } catch (error) {
      console.log(
        `Error while creating invoices inside createInvoiceContent: ${error}`
      );
    }
  };

  const handleInvoiceCreated = async () => {
    const data = { customer_name: customerName };
    const response = await createInvoice(data);

    if (response.data.success) {
      const invoiceId = response.data.data.invoiceId;
      const singleInvoiceResponse = await getSingleInvoice(invoiceId);
      if (singleInvoiceResponse.data.success) {
        const singleInvoice = singleInvoiceResponse.data.data.invoice;
        const dateTime = new Date(singleInvoice.date);
        singleInvoice.date = dateTime.toLocaleDateString();

        setInvoice(singleInvoice);
        setInvoiceCreated(true);
      }
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
            Create an Invoice
          </Link>
          <Button
            className="p-3 rounded-xl font-semibold text-sm"
            buttonText="Save As Draft"
            buttonColor="#E5E7EB"
            hoverColor="#E5E7EB"
            textColor="#7A1DF9"
            onClick={handleSaveAsDraft}
          />
          <Button
            className="p-3 rounded-xl font-semibold text-sm"
            buttonText="Apply Changes"
            buttonColor="#7A1DF9"
            hoverColor="#7A1DF9"
            textColor="white"
            onClick={handleApplyChanges}
          />
        </ContentNavbar>
      </div>

      <div className="inventory-details bg-white rounded-3xl border-2 border-gray-200 h-[570px] p-4 flex-grow max-h-[600px] overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-4">Create Invoice</h1>
        {!isInvoiceCreated ? (
          <div className="invoice-form flex flex-col w-[250px]">
            <InputField
              className={
                "bg-gray-100 h-10 p-2 border-2 w-full rounded-md shadow-sm hover:border-purple-500"
              }
              labelText={"Enter Customer Name"}
              type={"text"}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <Button
              className={
                "p-3 rounded-xl font-semibold text-sm hover:bg-gray-200 hover:text-white"
              }
              buttonText="Next"
              buttonColor="#7A1DF9"
              hoverColor="#7A1DF9"
              textColor="white"
              onClick={handleInvoiceCreated}
            />
          </div>
        ) : (
          <>
            {!isInvoiceItemModal ? (
              <div className="create-invoice-items-container text-sm ">
                <InputField
                  className={
                    "bg-gray-100 h-10 p-2 border-2 w-full rounded-md shadow-sm hover:border-purple-500"
                  }
                  labelText={"Invoice Number"}
                  type={"text"}
                  value={invoice.reference_number}
                  placeholder={invoice.reference_number}
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
                    value={customerName}
                    readOnly
                  />
                </span>
                <CustomInvoiceTable
                  invoiceItems={invoiceItems}
                  setInvoiceItems={setInvoiceItems}
                  fetchInvoiceItems={fetchInvoiceItems}
                  invoiceId={invoice.id}
                />

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

                <Add text={"Add an invoice item"} onClick={openItemListModal} />
              </div>
            ) : (
              <InvoiceItemModal
                products={products}
                createInvoiceItem={createInvoiceItem}
                invoiceId={invoice.id}
                closeItemListModal={closeItemListModal}
                refreshStates={refreshStates}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
