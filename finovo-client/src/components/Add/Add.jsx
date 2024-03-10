import { AddCircle } from "react-ionicons";

export default function Add({ text, ...rest }) {
  return (
    <div className="add text-center p-4 border-4 border-dashed border-black rounded-3xl flex flex-col items-center justify-center">
      <button
        {...rest}
        className="flex flex-col text-black items-center justify-center"
      >
        <AddCircle color={"black"} height="50px" width="50px" />
        {text}
      </button>
    </div>
  );
}

// #CBD5E1
