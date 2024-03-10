import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";

export default function InvoiceItemModal({
  products,
  createInvoiceItem,
  invoiceId,
  closeItemListModal,
  refreshStates,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null); // Changed to string
  const [quantity, setQuantity] = useState(0);

  const handleProductChange = (event) => {
    const selectedProduct = event.target.value;
    setSelectedProduct(selectedProduct);
    console.log(JSON.stringify(selectedProduct));
  };

  // Corrected function declaration
  const handleSubmit = async () => {
    const data = { quantity };
    try {
      const response = await createInvoiceItem(
        invoiceId,
        selectedProduct,
        data
      );
      if (response.data.success) {
        refreshStates();
        closeItemListModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="invoice-items-modal flex flex-col text-sm p-32 pr-64 pl-64">
      <span className="text-lg font-semibold mb-4">Enter Invoice Item</span>
      <Dropdown
        selectedProduct={selectedProduct}
        handleProductChange={handleProductChange}
        products={products}
        inputId={"productName"}
        labelText={"Product Name"}
      />
      <InputField
        placeholder={"Enter Product Quantity"}
        labelText={"Quantity"}
        inputId={"quantity"}
        className="bg-gray-100 h-10 p-2 border-2 w-full"
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Button
        className="p-3 rounded-xl font-semibold text-sm"
        buttonText="Add Product"
        buttonColor="#7A1DF9"
        hoverColor="#7A1DF9"
        textColor="white"
        onClick={handleSubmit}
      />
    </div>
  );
}
