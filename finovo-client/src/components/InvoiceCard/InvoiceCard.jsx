import { Ellipse, Trash, CheckmarkCircle, CloseCircle } from "react-ionicons";

export default function InvoiceCard({
  invoiceId,
  invoiceRef,
  name,
  status,
  date,
  total,
  handleDelete,
  handleMarkPaid,
  handleMarkUnpaid,
  openInvoiceDetails,
}) {
  const handleMarkPaidClick = (event) => {
    event.stopPropagation();
    handleMarkPaid(invoiceId);
  };

  const handleMarkUnpaidClick = (event) => {
    event.stopPropagation();
    handleMarkUnpaid(invoiceId);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    handleDelete(invoiceId);
  };

  return (
    <button
      onClick={() => openInvoiceDetails(invoiceId)}
      className="flex flex-row m-2 p-3 pr-6 w-full justify-between items-center gap-4 border-2 rounded-xl hover:bg-gray-100 hover:border-purple-500"
    >
      {status === "paid" ? (
        <Ellipse
          className={"flex-none"}
          color={"#4d7c0f"}
          height="20px"
          width="20px"
        />
      ) : (
        <Ellipse
          className={"flex-none"}
          color={"#dc2626"}
          height="20px"
          width="20px"
        />
      )}

      <div className="flex flex-col flex-auto">
        <span className="text-md text-left font-semibold text-black">
          {name}
        </span>
        <span className="text-sm text-left text-gray font-normal">
          {invoiceRef} • {date}
        </span>
      </div>
      <span className="font-semibold text-xl">{`₹${total}`}</span>

      <div className="flex-none font-semibold text-xl divide-x divide-gray-400">
        <span className="px-2">
          {status === "paid" ? (
            <button
              onClick={(e) => handleMarkUnpaidClick(e)}
              className="m-1 p-2 rounded-full hover:bg-gray-300"
            >
              <CloseCircle color={"black"} height="20px" width="20px" />
            </button>
          ) : (
            <button
              onClick={(e) => handleMarkPaidClick(e)}
              className="m-1 p-2 rounded-full hover:bg-gray-300"
            >
              <CheckmarkCircle color={"black"} height="20px" width="20px" />
            </button>
          )}
        </span>
        <span className="px-2">
          <button
            onClick={(e) => handleDeleteClick(e)}
            className="m-1 p-2 rounded-full hover:bg-gray-300"
          >
            <Trash color={"black"} height="20px" width="20px" />
          </button>
        </span>
      </div>
    </button>
  );
}
