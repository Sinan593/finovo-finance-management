import { useState, useEffect } from "react";
import InputFieldNoLabel from "../InputFieldNoLabel/InputFieldNoLable";
import InputFieldNoLabelSmall from "../InputFieldNoLabel/InputFieldNoLabelSmall";
import { Create, Trash } from "react-ionicons";
import axios from "axios";

export default function CustomTable({
  products,
  setProducts,
  invoiceId,
  fetchProducts,
}) {
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts(invoiceId);

        if (response.data.success) {
          const productsList = response.data.data.products;
          setProducts(productsList);
        }
      } catch (error) {
        console.log(`Error while fetching products: ${error}`);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="table-container overflow-y-auto h-[350px] mb-8">
      <table className="bg-white text-black min-w-full border-collapse text-sm rounded-3xl">
        <thead className="bg-black text-white h-16">
          <tr>
            <th className="rounded-tl-3xl">Action</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Stock</th>
            <th>Cost Price</th>
            <th>Selling Price</th>
            <th>Discount %</th>
            <th className="rounded-tr-3xl">Tax %</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id} className="rounded-bl-3xl h-16">
                <td>
                  <button className="m-1 p-1">
                    <Create color={"black"} height="20px" width="20px" />
                  </button>
                  <button
                    className="m-1 p-1"
                    onClick={() => deleteProducts(product.id)}
                  >
                    <Trash color={"black"} height="20px" width="20px" />
                  </button>
                </td>
                <td>
                  <InputFieldNoLabel inputText={product.name} />
                </td>
                <td>
                  <InputFieldNoLabel inputText={product.category} />
                </td>
                <td>
                  <InputFieldNoLabel inputText={product.brand} />
                </td>
                <td>
                  <InputFieldNoLabelSmall inputText={product.stock} />
                </td>
                <td>
                  <InputFieldNoLabelSmall inputText={product.cost_price} />
                </td>
                <td>
                  <InputFieldNoLabelSmall inputText={product.selling_price} />
                </td>
                <td>
                  <InputFieldNoLabelSmall inputText={product.discount_rate} />
                </td>
                <td className="rounded-br-3xl">
                  <InputFieldNoLabelSmall inputText={product.tax_rate} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
