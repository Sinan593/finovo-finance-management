import { useState, useEffect } from "react";
import InputFieldNoLabel from "../InputFieldNoLabel/InputFieldNoLable";
import InputFieldNoLabelSmall from "../InputFieldNoLabel/InputFieldNoLabelSmall";

export default function CustomInvoiceDetailsTable({ invoiceItems }) {
  return (
    <div className="table-container overflow-y-auto h-[200px] mb-8">
      <table className="bg-white text-black min-w-full border-collapse text-sm rounded-3xl">
        <thead className="bg-black text-white h-16">
          <tr>
            <th className="rounded-tl-3xl">Product Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Discount</th>
            <th>Subtotal</th>
            <th>Tax</th>
            <th className="rounded-tr-3xl">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((invoice) => {
            return (
              <tr key={invoice.id} className="rounded-bl-3xl h-16">
                <td className="m-1 p-4">
                  <InputFieldNoLabel inputText={invoice.name} />
                </td>
                <td>
                  <InputFieldNoLabel inputText={invoice.quantity} />
                </td>
                <td>
                  <InputFieldNoLabel
                    className={
                      "bg-white h-10 p-2 border-2 border-gray-200 hover:border-purple-500 rounded-xl min-w-[50px] max-w-[100px] w-auto"
                    }
                    inputText={invoice.unit_price}
                  />
                </td>
                <td>
                  <InputFieldNoLabelSmall
                    className={
                      "bg-white h-10 p-2 border-2 border-gray-200 hover:border-purple-500 rounded-xl min-w-[50px] max-w-[100px] w-auto"
                    }
                    inputText={invoice.discount}
                  />
                </td>
                <td>
                  <InputFieldNoLabelSmall
                    className={
                      "bg-white h-10 p-2 border-2 border-gray-200 hover:border-purple-500 rounded-xl min-w-[50px] max-w-[100px] w-auto"
                    }
                    inputText={invoice.subtotal}
                  />
                </td>
                <td>
                  <InputFieldNoLabelSmall
                    className={
                      "bg-white h-10 p-2 border-2 border-gray-200 hover:border-purple-500 rounded-xl min-w-[50px] max-w-[100px] w-auto"
                    }
                    inputText={invoice.tax}
                  />
                </td>
                <td className="rounded-br-3xl">
                  <InputFieldNoLabelSmall
                    className={
                      "bg-white h-10 p-2 border-2 border-gray-200 hover:border-purple-500 rounded-xl min-w-[50px] max-w-[100px] w-auto"
                    }
                    inputText={invoice.total}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
