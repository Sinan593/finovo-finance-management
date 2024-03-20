import { Ellipse, Trash, CheckmarkCircle, CloseCircle } from "react-ionicons";

export default function MessageCard({
  invoiceId,
  name,
  status,
  date,
  handleDelete,
}) {
  const handleDeleteClick = (event) => {
    event.stopPropagation();
    handleDelete(invoiceId);
  };

  return (
    <button className="flex flex-row m-2 p-3 pr-6 w-full justify-between items-center gap-4 border-2 rounded-xl hover:bg-gray-100 hover:border-purple-500">
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
        <span className="text-sm text-left text-gray font-normal">{date}</span>
      </div>

      <div className="flex-none font-semibold text-xl divide-x divide-gray-400">
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
