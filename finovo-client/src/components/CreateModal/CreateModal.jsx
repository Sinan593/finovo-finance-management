import InputField from "../InputField/InputField";
import SmallInputField from "../SmallInputField/SmallInputField";
import Button from "../Button/Button";
import { useState } from "react";
import axios from "axios";
export default function CreateModal({ openModal, closeModal }) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [costPrice, setCostPrice] = useState(0.0);
  const [sellingPrice, setSellingPrice] = useState(0.0);
  const [discount, setDiscount] = useState(0.0);
  const [tax, setTax] = useState(0.0);

  const handleCancel = () => {
    closeModal();
  };

  const handleSubmit = async () => {
    const data = {
      name: productName,
      category,
      brand,
      stock,
      cost_price: costPrice,
      selling_price: sellingPrice,
      discount_rate: discount / 100,
      tax_rate: tax / 100,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/products",
        data,
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log(
          `Product ${response.data.data.productId} Added Successfully! `
        );
      }
    } catch (error) {
      console.log(`Error while adding product: ${error}`);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="create-modal shadow-xl border-2 border-gray-200 p-6 rounded-2xl bg-white h-[500px] w-[700px] overflow-y-auto">
      <span className="text-3xl font-semibold ">Add Product</span>
      <div className="create-modal-inputs">
        <InputField
          labelText={"Product Name"}
          placeholder={"Enter Product Name"}
          className="bg-slate-100 rounded-xl h-12 p-2 border-2 border-slate-100 hover:border-purple-500 w-full"
          onChange={(e) => setProductName(e.target.value)}
        />
        <InputField
          labelText={"Category"}
          placeholder={"Enter Category"}
          className="bg-slate-100 rounded-xl h-12 p-2 border-2 border-slate-100 hover:border-purple-500 w-full"
          onChange={(e) => setCategory(e.target.value)}
        />
        <InputField
          labelText={"Brand"}
          placeholder={"Enter Brand"}
          className="bg-slate-100 rounded-xl h-12 p-2 border-2 border-slate-100 hover:border-purple-500 w-full"
          onChange={(e) => setBrand(e.target.value)}
        />
        <span className="flex flex-row gap-4">
          <SmallInputField
            labelText={"Cost Price"}
            placeholder={"₹0.00"}
            onChange={(e) => setCostPrice(e.target.value)}
          />
          <SmallInputField
            labelText={"Selling Price"}
            placeholder={"₹0.00"}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
        </span>
        <span className="flex flex-row gap-4">
          <SmallInputField
            labelText={"Stock"}
            placeholder={"0"}
            onChange={(e) => setStock(e.target.value)}
          />
          <SmallInputField
            labelText={"Discount"}
            placeholder={"0%"}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </span>
        <InputField
          labelText={"Tax"}
          placeholder={"0%"}
          className="bg-slate-100 rounded-xl h-12 p-2 border-2 border-slate-100 hover:border-purple-500 w-full"
          onChange={(e) => setTax(e.target.value)}
        />

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
