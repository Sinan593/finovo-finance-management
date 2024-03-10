export default function InputField({ labelText, inputId, ...props }) {
  return (
    <div className="mb-4 mt-4 flex flex-col">
      <label className="text-md" htmlFor={inputId}>
        {labelText}
      </label>
      <input
        className="bg-gray-100 h-10 p-2 border-2 w-full"
        id={inputId}
        {...props}
      />
    </div>
  );
}
