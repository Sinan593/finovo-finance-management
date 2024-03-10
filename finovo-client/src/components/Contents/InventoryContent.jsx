import ContentNavbar from "../ContentNavbar/ContentNavbar";
import Table from "../Table/Table";
import CustomTable from "../Custom Table/CustomTable";
import Add from "../Add/Add";
import Button from "../Button/Button";
import CreateModal from "../CreateModal/CreateModal";
import { useState } from "react";

import { Link } from "@mui/material";

import axios from "axios";

export default function InventoryContent({ fetchProducts }) {
  const [products, setProducts] = useState([]);
  const [createModal, setCreateModal] = useState(false);

  const openCreateModal = () => setCreateModal(true);
  const closeCreateModal = () => setCreateModal(false);

  const handleRefresh = async () => {
    try {
      const response = await fetchProducts();

      if (response.data.success) {
        const productsList = response.data.data.products;
        setProducts(productsList);
      }
    } catch (error) {
      console.log(`Error while fetching products: ${error}`);
    }
  };

  const addProducts = async () => {
    openCreateModal();
  };

  const deleteProducts = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/products/${productId}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log("Error Deleting Products!");
    } finally {
      handleRefresh();
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
            Inventory
          </Link>
          <Button
            className="p-3 rounded-xl font-semibold text-sm"
            buttonText="Apply Changes"
            buttonColor="#E5E7EB"
            hoverColor="#E5E7EB"
            textColor="#7A1DF9"
          />
          <Button
            className="p-3 rounded-xl font-semibold text-sm"
            buttonText="Refresh"
            buttonColor="#7A1DF9"
            hoverColor="#7A1DF9"
            textColor="white"
            onClick={handleRefresh}
          />
        </ContentNavbar>
      </div>
      {!createModal ? (
        <div className="inventory-details bg-white rounded-3xl border-2 border-gray-200 h-128 p-4 flex-grow">
          <h1 className="text-3xl font-semibold mb-4">Inventory</h1>
          <CustomTable
            products={products}
            setProducts={setProducts}
            fetchProducts={fetchProducts}
            deleteProducts={deleteProducts}
          />
          <Add text={"Click here to add a new Product"} onClick={addProducts} />
        </div>
      ) : (
        <div className="create-modal-container flex justify-center items-center">
          <CreateModal
            openModal={openCreateModal}
            closeModal={closeCreateModal}
          />
        </div>
      )}
    </div>
  );
}
